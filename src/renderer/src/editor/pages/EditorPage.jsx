import { useEffect } from 'react';
import { CodeEditor, SideBar } from '../components';
import {
  useCodeStore,
  useLocalStorage,
  useBase64,
  useSettingsStore
} from '../hooks';
import '../helpers/userWorker';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';
import { setEditorSnippets } from '../helpers/editorSnippets';

export const EditorPage = () => {
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { decodeBase64, encodeBase64 } = useBase64();
  const { codeSaved, onSetActiveCode, onSetCodeSaved, activeCode } =
    useCodeStore();
  const { onSetSnippets, onSetSettings, settings, snippets } =
    useSettingsStore();

  useEffect(() => {
    const settings = getLocalStorageItem(LOCALSTORAGE_ITEMS.SETTINGS);
    const codeSaved = getLocalStorageItem(LOCALSTORAGE_ITEMS.CODE_SAVED);
    const snippetsSaved = getLocalStorageItem(
      LOCALSTORAGE_ITEMS.SNIPPETS_SAVED
    );
    if (Array.isArray(codeSaved)) {
      onSetCodeSaved(codeSaved);
    }
    if (Array.isArray(snippetsSaved)) {
      onSetSnippets(snippetsSaved);
    }
    if (settings) {
      onSetSettings(settings);
    }
    onSetActiveCode(
      decodeBase64(getLocalStorageItem(LOCALSTORAGE_ITEMS.DYNAMIC_SAVE)) ?? ''
    );
  }, []);

  useEffect(() => {
    document.querySelector('html').className =
      settings.theme === 'vs-dark' ? 'dark' : 'light';
  }, [settings.theme]);

  useEffect(() => {
    setLocalStorageItem(LOCALSTORAGE_ITEMS.CODE_SAVED, codeSaved);
  }, [codeSaved]);

  useEffect(() => {
    setEditorSnippets(snippets);
    setLocalStorageItem(LOCALSTORAGE_ITEMS.SNIPPETS_SAVED, snippets);
  }, [snippets]);

  useEffect(() => {
    setLocalStorageItem(
      LOCALSTORAGE_ITEMS.DYNAMIC_SAVE,
      encodeBase64(activeCode)
    );
  }, [activeCode]);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
