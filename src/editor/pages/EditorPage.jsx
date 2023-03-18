import { useEffect } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { SideBar } from '../components/SideBar';
import '../helpers/userWorker';
import '../helpers/editorSnippets';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCodeStore } from '../hooks/useCodeStore';
import { useRouteUrl } from '../hooks/useRouteUrl';

export const EditorPage = () => {
  const { setLocalStorageItem, getLocalStorageItem } = useLocalStorage();
  const { onSetActiveCode } = useCodeStore();
  const { decodeByCode } = useRouteUrl();

  useEffect(() => {
    if (getLocalStorageItem('dynamicSave') === null) {
      setLocalStorageItem('dynamicSave', '');
    } else {
      onSetActiveCode(decodeByCode(getLocalStorageItem('dynamicSave')));
    }
  }, []);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
