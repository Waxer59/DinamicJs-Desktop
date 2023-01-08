import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useRouteUrl } from '../hooks/useRouteUrl';
import { useCodeStore } from '../hooks/useCodeStore';
import { useSettingsStore } from '../hooks/useSettingsStore';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Editor = () => {
  const [editor, setEditor] = useState(null);
  const { decodeText, saveCodeUrl } = useRouteUrl();
  const { onSetActiveCode, uploadedCode, activeCode } = useCodeStore();
  const { onSetSettings } = useSettingsStore();
  const { getLocalStorageItem } = useLocalStorage();
  const { settings } = useSettingsStore();
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl.current && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current, {
          value: decodeText(),
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

  useEffect(() => {
    if (activeCode !== null) {
      saveCodeUrl(activeCode);
    }
  }, [activeCode]);

  useEffect(() => {
    const settings = getLocalStorageItem('settings');
    if (settings) {
      onSetSettings(settings);
    }
  }, []);

  return <div className="code" ref={monacoEl}></div>;
};
