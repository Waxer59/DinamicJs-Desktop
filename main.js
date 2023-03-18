const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const isDev = process.env.VITE_ENVIRONMENT === 'DEV';

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'dist', 'images', 'favicon.ico')
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
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
