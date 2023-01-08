import { useSweetAlert } from '../hooks/useSweetAlert';
import downloadjs from 'downloadjs';
import { useCodeStore } from '../hooks/useCodeStore';
import { useSettingsStore } from '../hooks/useSettingsStore';
import { useLocalStorage } from '../hooks/useLocalStorage';
import confetti from 'canvas-confetti';

export const SideBar = () => {
  const { throwAlert, throwConfig, throwLocalSave, throwToast } =
    useSweetAlert();
  const { settings, onSetSettings } = useSettingsStore();
  const { setLocalStorageItem } = useLocalStorage();
  const { activeCode, codeSaved } = useCodeStore();

  const onSkypackClick = () => {
    window.open('https://www.skypack.dev/', '_blank', 'noopener,noreferrer');
  };

  const onDownloadClick = async () => {
    const fileName = await throwAlert(
      'File name',
      'Dont put any extension',
      'info'
    );
    if (fileName) {
      downloadjs(activeCode, `${fileName}.js`, 'text/javascript');
      throwToast('success', 'Downloaded');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const onConfigClick = async () => {
    const configValue = await throwConfig(settings);
    onSetSettings(configValue);
    setLocalStorageItem('settings', configValue);
  };

  const onLocalSaveClick = () => {
    throwLocalSave(codeSaved);
  };

  return (
    <aside className="menu" id="menu">
      <header>
        <ul style={{ marginTop: '35px' }}>
          <li key={1}>
            <button title="LocalSave" onClick={onLocalSaveClick}>
              <i className="fa-solid fa-bookmark"></i>
            </button>
          </li>
          <li key={2} onClick={onDownloadClick}>
            <button title="Download">
              <i className="fa-solid fa-file-arrow-down"></i>
            </button>
          </li>
          <li key={3}>
            <button onClick={onSkypackClick} title="Skypack">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m19.82 11.27-5.997-2.994 5.999-2.993c.28-.14.453-.42.453-.734a.815.815 0 0 0-.454-.735L12.366.087a.814.814 0 0 0-.733 0L4.178 3.814a.815.815 0 0 0-.453.735v7.454c0 .28.15.548.384.699l.07.034 5.998 2.994-5.999 2.993a.815.815 0 0 0-.453.734c0 .314.174.594.453.735l7.455 3.727a.814.814 0 0 0 .361.081.814.814 0 0 0 .361-.081l7.454-3.727c.28-.14.455-.42.455-.735v-7.454a.785.785 0 0 0-.443-.733zm-7.814-9.54 5.625 2.819-5.625 2.818L6.38 4.55zm-6.64 4.135 4.811 2.41-4.81 2.412zm1.014 6.138 5.626-2.819 5.625 2.82-5.625 2.818zm4.81 5.044v4.81l-4.81-2.41zm7.455 1.91-5.824 2.911v-5.625l5.824-2.912v5.625z" />
              </svg>
            </button>
          </li>
        </ul>
      </header>
      <footer>
        <ul>
          <li className="settings" key={5} title="Settings">
            <button onClick={onConfigClick}>
              <i className="fa-solid fa-gear settings"></i>
            </button>
            <span>Settings</span>
          </li>
        </ul>
      </footer>
    </aside>
  );
};
