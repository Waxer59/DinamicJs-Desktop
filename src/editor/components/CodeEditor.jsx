import { Editor } from './Editor';
import Split from 'react-split';
import { CodePreviewer } from './CodePreviewer';
import { useEffect, useRef } from 'react';
import { useCodeStore } from '../hooks/useCodeStore';
import { useRouteUrl } from '../hooks/useRouteUrl';
import { useSweetAlert } from '../hooks/useSweetAlert';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CodeEditor = () => {
  const dropArea = useRef(null);
  const { throwToast } = useSweetAlert();
  const { onSetActiveCode, onSetUploadedCode, onSetCodeSaved, codeSaved } =
    useCodeStore();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { decodeText } = useRouteUrl();

  useEffect(() => {
    onSetActiveCode(decodeText());
    onSetCodeSaved(getLocalStorageItem('codeSaved') ?? []);
  }, []);

  useEffect(() => {
    setLocalStorageItem('codeSaved', codeSaved);
  }, [codeSaved]);

  useEffect(() => {
    const getTextFromFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsText(file);
      });
    };

    dropArea.current?.addEventListener(
      'drop',
      async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type !== 'text/javascript') {
          throwToast('error', 'Invalid file type');
          onSetUploadedCode('');
        } else {
          const text = await getTextFromFile(file);
          onSetUploadedCode(text);
          throwToast('success', 'File uploaded successfully');
        }
      },
      false
    );
  }, []);

  return (
    <main className="main" ref={dropArea}>
      <Split style={{ display: 'flex', width: '100%' }} sizes={[50, 50]}>
        <div className="code-container">
          <Editor />
        </div>

        <div className="output-container">
          <CodePreviewer />
        </div>
      </Split>
    </main>
  );
};
