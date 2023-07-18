import { useEffect, useState } from 'react';
const { ipcRenderer } = window;

export const NewVersionNotification = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [message, setMessage] = useState(
    'A new update is available. Downloading now...'
  );

  useEffect(() => {
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      setIsUpdateAvailable(true);
    });

    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      setMessage(
        'Update Downloaded. It will be installed on restart. Restart now?'
      );
      setShowControls(true);
    });

    return () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      ipcRenderer.removeAllListeners('update_available');
    };
  }, []);

  const handleRestartNow = () => {
    ipcRenderer.send('restart_app');
  };

  const handleLater = () => {
    setIsUpdateAvailable(false);
  };

  return (
    <div className={`notification ${isUpdateAvailable ? '' : 'hidden'}`}>
      <p>{message}</p>
      <div className={`notification-buttons ${showControls ? '' : 'hidden'}`}>
        <button
          className="notification-install-button"
          onClick={handleRestartNow}>
          Restart now!
        </button>
        <button className="notification-later-button" onClick={handleLater}>
          Later
        </button>
      </div>
    </div>
  );
};
