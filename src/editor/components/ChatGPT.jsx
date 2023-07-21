import { useEffect, useState, useRef } from 'react';
import { useSettingsStore } from '../hooks';
import { askGPT } from '../../services/openaiAPI';
import { BeatLoader } from 'react-spinners';
import snarkdown from 'snarkdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const ROLES = {
  system: 'system',
  user: 'user',
  asistant: 'assistant'
};

export const ChatGPT = () => {
  const {
    isChatGPTOpen,
    onSetIsChatGPTOpen,
    settings,
    chatGPTQuestion,
    onSetChatGPTQuestion
  } = useSettingsStore();
  const { chatGPTApiKey } = settings;
  const [messages, setMessages] = useState([
    {
      role: ROLES.asistant,
      content: `Welcome to the AI chat room!`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const handleChange = () => {
    const el = textAreaRef.current;
    el.style.height = '0px';
    const scrollHeight = el.scrollHeight;
    el.style.height = scrollHeight + 'px';
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messagesContainerRef.current?.scrollHeight]);

  useEffect(() => {
    if (isChatGPTOpen && !isLoading && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isChatGPTOpen]);

  useEffect(() => {
    if (settings.chatGPTApiKey) {
      hljs.highlightAll();
    }
  }, [messages, settings]);

  useEffect(() => {
    if (
      chatGPTQuestion.trim().length > 0 &&
      !isLoading &&
      textAreaRef.current
    ) {
      onSetIsChatGPTOpen(true);
      textAreaRef.current.value = `Explain to me this line of js:\n\n\`\`\`javascript\n${chatGPTQuestion}\n\`\`\``;
      handleSubmit();
      onSetChatGPTQuestion('');
    }
  }, [chatGPTQuestion]);

  const onClose = () => {
    onSetIsChatGPTOpen(false);
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    const content = textAreaRef.current.value;
    textAreaRef.current.value = '';
    textAreaRef.current.style.height = '42px'; // Empty textarea size
    if (content.trim().length === 0) return;
    const newMessage = [
      ...messages,
      {
        role: ROLES.user,
        content
      }
    ];
    setMessages((_) => newMessage);
    setIsLoading(true);
    const resp = await askGPT(chatGPTApiKey, newMessage);
    setIsLoading(false);
    if (resp === null) {
      setMessages((prev) => [
        ...prev,
        {
          role: ROLES.asistant,
          content: 'There has been a problem. Please try again now or later.'
        }
      ]);
      return;
    }
    setMessages((prev) => [...prev, resp?.data.choices[0].message]);
  };

  const handleDeleteMessages = () => {
    setMessages([]);
  };

  return (
    <div className={`sidebar_ChatGPT_tab ${isChatGPTOpen ? '' : 'hidden'}`}>
      <header>
        <button onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3>ChatGPT</h3>
        <button onClick={handleDeleteMessages}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </header>
      {chatGPTApiKey ? (
        <div className="sidebar_chatGPT_content">
          <ul className="sidebar_chatGPT_messages" ref={messagesContainerRef}>
            {messages.map((message, idx) => (
              <li
                key={idx}
                className={`sidebar_chatGPT_messages_${
                  message.role === ROLES.asistant ? 'AI' : 'HUMAN'
                }`}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: snarkdown(message.content)
                  }}></p>
              </li>
            ))}
            {isLoading && (
              <li className="sidebar_chatGPT_messages_AI">
                <p>
                  <BeatLoader color="var(--tertiary-color)" size={10} />
                </p>
              </li>
            )}
          </ul>
          <div className="sidebar_chatGPT_search">
            <textarea
              id="text"
              onChange={handleChange}
              placeholder="Search..."
              ref={textAreaRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              style={{ opacity: isLoading ? 0.5 : 1 }}
              spellCheck="false"></textarea>
            <button onClick={handleSubmit}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <h4>
          Please provide an openai Api key in the configuration section to be
          able to use this feature.
        </h4>
      )}
    </div>
  );
};
