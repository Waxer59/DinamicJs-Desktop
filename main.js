const { app, BrowserWindow, Menu } = require('electron');

const path = require('node:path');

const isDev = process.env.DEV;

let mainWindow;

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'dist', 'images', 'favicon.ico')
  });
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);
  mainWindow.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}`);
  //!  Open dev tools
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
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
