const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const {
  setupTitlebar,
  attachTitlebarToWindow
} = require('custom-electron-titlebar/main');

setupTitlebar();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
	  transparent: true,
	  frame: false,
    icon: path.join(__dirname, '/images', '/favicon.ico'),
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

//  Open dev tools
//  mainWindow.webContents.openDevTools();

  attachTitlebarToWindow(mainWindow);
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
