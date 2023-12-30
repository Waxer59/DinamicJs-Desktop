const { app, BrowserWindow, Menu } = require('electron');
const { updateElectronApp } = require('update-electron-app');

const path = require('node:path');

let mainWindow;

if (require('electron-squirrel-startup')) app.quit();

updateElectronApp({
  updateInterval: '1 hour'
});

const createWindow = () => {
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);

  /*
  'MAIN_WINDOW_VITE_DEV_SERVER_URL' and 'MAIN_WINDOW_VITE_NAME' are global variables
  Please see: https://www.electronforge.io/config/plugins/vite
  */

  /* eslint-disable no-undef */

  mainWindow = new BrowserWindow({
    icon: path.join(
      __dirname,
      '..',
      'renderer',
      MAIN_WINDOW_VITE_NAME,
      'images',
      'favicon.ico'
    ),
    minWidth: 500,
    minHeight: 270,
    width: 800,
    height: 600
  });

  mainWindow.loadURL(
    MAIN_WINDOW_VITE_DEV_SERVER_URL ??
      `file://${path.join(
        __dirname,
        '..',
        'renderer',
        MAIN_WINDOW_VITE_NAME,
        'index.html'
      )}`
  );

  //!  Open dev tools
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
  /* eslint-enable no-undef */
};

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
