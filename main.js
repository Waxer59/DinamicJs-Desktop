const { app, BrowserWindow, Menu, ipcMain, autoUpdater } = require('electron');

const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();

const server = process.env.AUTO_UPDATE_URL;
const url = `${server}/update/${process.platform}/${app.getVersion()}`;
autoUpdater.setFeedURL({ url });

const isDev = process.env.VITE_ENVIRONMENT === 'DEV';

let mainWindow;

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'dist', 'images', 'favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'dist', 'index.html')}`
  );
  //!  Open dev tools
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
