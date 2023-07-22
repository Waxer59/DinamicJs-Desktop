import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useRef, useState, useEffect } from 'react';
import { useCodeStore } from '../hooks/useCodeStore';
import { useSettingsStore } from '../hooks/useSettingsStore';
import { useBase64, useLocalStorage, useSweetAlert } from '../hooks';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';
import { setChatGPTFeatures } from '../helpers/editorSnippets';

export const Editor = () => {
  const [editor, setEditor] = useState(null);
  const { onSetActiveCode, uploadedCode } = useCodeStore();
  const { settings, onSetChatGPTQuestion } = useSettingsStore();
  const { decodeBase64 } = useBase64();
  const { getLocalStorageItem } = useLocalStorage();
  const { throwToast } = useSweetAlert();
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl.current && !editor) {
      const { chatGPTApiKey, ...editorSettings } = settings;
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
          ...editorSettings
        })
      );
    }
    if (editor) {
      editor.onDidChangeModelContent(() => {
        onSetActiveCode(editor.getValue());
      });
      setChatGPTFeatures(editor, (ed) => {
        const selectedText = ed
          .getModel()
          .getValueInRange(editor.getSelection());
        const settings = JSON.parse(
          localStorage.getItem(LOCALSTORAGE_ITEMS.SETTINGS)
        );

        if (!settings.chatGPTApiKey) {
          throwToast(
            'error',
            'Please provide an OpenAI API key in the configuration section to use this feature.'
          );
          return;
        }
        if (selectedText.trim().length <= 0) {
          throwToast('error', 'Please select some text to ask ChatGPT');
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
    const { chatGPTApiKey, ...editorSettings } = settings;
    editor?.updateOptions(editorSettings);
  }, [settings]);

  return <div className="code" ref={monacoEl}></div>;
};
