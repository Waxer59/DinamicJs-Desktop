const { app, BrowserWindow, Menu, dialog, autoUpdater } = require('electron');

const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();

const server = 'https://dinamic-js-desktop-auto-update.vercel.app';
const url = `${server}/update/${process.platform}/${app.getVersion()}`;
autoUpdater.setFeedURL({ url });

const isDev = process.env.VITE_ENVIRONMENT === 'DEV';

let mainWindow;

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  mainWindow = new BrowserWindow({
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

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(() => {
  createWindow();

  if (!handleSquirrelEventFirstRun()) {
    autoUpdater.checkForUpdates();
  }
});

function handleSquirrelEventFirstRun() {
  if (process.argv.length === 1) {
    return false;
  }
  const squirrelEvent = process.argv[1];
  return squirrelEvent === '--squirrel-firstrun';
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

autoUpdater.on('update-available', () => {
  const notificationMsg = {
    title: 'Application Update',
    body: 'A new version of the application is available. This update is being downloaded automatically',
    icon: path.join(__dirname, 'dist', 'images', 'favicon.ico')
  };

  const notification = new Notification(notificationMsg.title, notificationMsg);

  notification.show();
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart now!', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'A new version has been downloaded. Restart the application to apply the updates.'
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application');
  console.error(message);
});
