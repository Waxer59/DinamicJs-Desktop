import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useCodeStore } from '../hooks/useCodeStore';
import { useSettingsStore } from '../hooks/useSettingsStore';
import { useBase64, useLocalStorage } from '../hooks';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';
import { setChatGPTFeatures } from '../helpers/editorSnippets';
import 'highlight.js/styles/atom-one-dark.css';

export const Editor = () => {
  const [editor, setEditor] = useState(null);
  const { onSetActiveCode, uploadedCode } = useCodeStore();
  const { settings, onSetChatGPTQuestion } = useSettingsStore();
  const { decodeBase64 } = useBase64();
  const { getLocalStorageItem } = useLocalStorage();
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl.current && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current, {
          value: decodeBase64(
            getLocalStorageItem(LOCALSTORAGE_ITEMS.DYNAMIC_SAVE)
          ),
          language: 'javascript',
          automaticLayout: true, // resize the code area
          padding: {
            top: 16
          },
          ...settings
        })
      );
    }
    if (editor) {
      editor.onDidChangeModelContent(() => {
        onSetActiveCode(editor.getValue());
      });
      setChatGPTFeatures(editor, (ed) => {
        if (!settings.chatGPTApiKey) {
          alert('You need to set ChatGPT API Key to use this feature');
          return;
        }

        const selectedText = ed
          .getModel()
          .getValueInRange(editor.getSelection());

        if (selectedText.trim().length <= 0) {
          alert('Please select some text to ask ChatGPT');
          return;
        }
        onSetChatGPTQuestion(selectedText);
      });
    }
    return () => editor?.dispose();
  }, [monacoEl.current]);

  useEffect(() => {
    if (editor) {
      editor.setValue(uploadedCode);
    }
  }, [uploadedCode]);

  useEffect(() => {
    editor?.updateOptions(settings);
  }, [settings]);

  return <div className="code" ref={monacoEl}></div>;
};
