import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useCodeStore } from '../hooks/useCodeStore';
import { useSettingsStore } from '../hooks/useSettingsStore';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useRouteUrl } from '../hooks/useRouteUrl';

export const Editor = () => {
  const [editor, setEditor] = useState(null);
  const { onSetActiveCode, uploadedCode, activeCode } = useCodeStore();
  const { onSetSettings } = useSettingsStore();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { encodeText, decodeByCode } = useRouteUrl();
  const { settings } = useSettingsStore();
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl.current && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current, {
          value: activeCode ?? '',
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
    if (getLocalStorageItem('dynamicSave') !== null && editor) {
      editor.setValue(decodeByCode(getLocalStorageItem('dynamicSave')));
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.setValue(uploadedCode);
    }
  }, [uploadedCode]);

  useEffect(() => {
    if (getLocalStorageItem('dynamicSave') !== null && activeCode !== null) {
      setLocalStorageItem('dynamicSave', encodeText(activeCode));
    }
  }, [activeCode]);

  useEffect(() => {
    editor?.updateOptions(settings);
  }, [settings]);

  useEffect(() => {
    const settings = getLocalStorageItem('settings');
    if (settings) {
      onSetSettings(settings);
    }
  }, []);

  return <div className="code" ref={monacoEl}></div>;
};
