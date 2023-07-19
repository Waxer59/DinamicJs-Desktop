import { useSettingsStore } from '../hooks';

export const ChatGPT = () => {
  const { isChatGPTOpen, onSetChatGPTOpen } = useSettingsStore();

  const onClose = () => {
    onSetChatGPTOpen(false);
  };

  return (
    <div className={`sidebar_ChatGPT_tab ${isChatGPTOpen ? '' : 'hidden'}`}>
      <header>
        <button onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3>ChatGPT</h3>
      </header>
      <div className="sidebar_chatGPT_content">
        <ul className="sidebar_chatGPT_messages">
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
          <li className="sidebar_chatGPT_messages_HUMAN"></li>
          <li className="sidebar_chatGPT_messages_AI"></li>
        </ul>
        <div className="sidebar_chatGPT_search">
          <input type="text" placeholder="Search..." />
          <button>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
