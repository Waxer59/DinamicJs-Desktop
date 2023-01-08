import { CodeEditor } from '../components/CodeEditor';
import { SideBar } from '../components/SideBar';
import { useRouteUrl } from '../hooks/useRouteUrl';
import { useCodeStore } from '../hooks/useCodeStore';
import '../helpers/userWorker';
import '../helpers/editorSnippets';
import { useEffect } from 'react';

export const EditorPage = () => {
  const { onSetUploadedCode } = useCodeStore();
  const { decodeByCode, getBase64Param } = useRouteUrl();
  useEffect(() => {
    window.onpopstate = (event) => {
      onSetUploadedCode(decodeByCode(getBase64Param()));
    };
  }, []);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
