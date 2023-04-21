import { Editor } from './Editor';
import Split from 'react-split';
import { CodePreviewer } from './CodePreviewer';
import { useEffect, useRef, useState } from 'react';
import { useCodeStore } from '../hooks/useCodeStore';
import { useSweetAlert } from '../hooks/useSweetAlert';
import { SWAL2_ICONS } from '../../constants/sweetAlertIconsConstants';
import { useCodePreviewer } from '../hooks/useCodePreviewer';

export const CodeEditor = () => {
  const dropArea = useRef(null);
  const popup = useRef(null);
  const preview = useRef(null);
  const [isOutputPopupOpen, setIsOutputPopupOpen] = useState(false);
  const { throwToast } = useSweetAlert();
  const { onSetUploadedCode, activeCode } = useCodeStore();
  const { update } = useCodePreviewer();

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
          throwToast(SWAL2_ICONS.ERROR, 'Invalid file type');
          onSetUploadedCode('');
        } else {
          const text = await getTextFromFile(file);
          onSetUploadedCode(text);
          throwToast(SWAL2_ICONS.SUCCESS, 'File uploaded successfully');
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    update(preview.current, activeCode);
  }, [activeCode, preview.current]);

  useEffect(() => {
    if (popup.current) {
      preview.current = popup.current.document.querySelector('#output');
      update(preview.current, activeCode);
    }
  }, [popup.current]);

  const onSplitOutputClick = () => {
    popup.current = window.open('about:blank', 'Output', 'popup');
    popup.current.window.document.body.innerHTML = `
    <iframe class="output" id="output"></iframe>
    `;
    popup.current.window.document.head.innerHTML = `<style>
    *{
      margin: 0;
      padding: 0;
    }
    .output {
      height: 100%;
      width: 100%;
      border: none;
      background-color: #2C2C2C;
      color: #9F9F9F;
    }
    </style>`;
    setIsOutputPopupOpen(true);
    popup.current.window.addEventListener('beforeunload', () => {
      setIsOutputPopupOpen(false);
    });
  };

  return (
    <main className="main" ref={dropArea}>
      {isOutputPopupOpen ? (
        <div className="code-container" style={{ width: '100%' }}>
          <Editor />
        </div>
      ) : (
        <Split style={{ display: 'flex', width: '100%' }} sizes={[50, 50]}>
          <div className="code-container">
            <Editor />
          </div>
          <div className="output-container">
            <CodePreviewer ref={preview} />
          </div>
        </Split>
      )}
      <button
        className="split-btn"
        onClick={onSplitOutputClick}
        style={{ display: `${isOutputPopupOpen ? 'none' : ''}` }}>
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </button>
    </main>
  );
};
