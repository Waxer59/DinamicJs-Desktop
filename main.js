const { app, BrowserWindow, Menu } = require('electron');

const path = require('node:path');

// TODO: FIX MONACO EDITOR ACTION (ASK CHATGPT)

const isDev = !app.isPackaged;

let mainWindow;

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'dist', 'images', 'favicon.ico'),
    minWidth: 500,
    minHeight: 270,
    width: 800,
    height: 600
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

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
