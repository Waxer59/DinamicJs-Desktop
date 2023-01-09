const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'dist', 'images', 'favicon.ico')
  });
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);

  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  //!  Open dev tools
   mainWindow.webContents.openDevTools();
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