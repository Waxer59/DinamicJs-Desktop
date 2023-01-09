import { useEffect } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { SideBar } from '../components/SideBar';
import '../helpers/userWorker';
import '../helpers/editorSnippets';

export const EditorPage = () => {
  useEffect(() => {
    
  }, []);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
