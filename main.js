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

  if (handleSquirrelEvent()) {
    return;
  }

  if (!handleSquirrelEventFirstRun()) {
    autoUpdater.checkForUpdates();
  }
});

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }
  const ChildProcess = require('child_process');
  const path = require('path');
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);
  const spawn = function (command, args) {
    let spawnedProcess;
    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) {}
    return spawnedProcess;
  };
  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus
      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;
    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers
      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;
    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
    case '--squirrel-firstrun':
      // This is called on the first run of the app
      return false;
  }
}

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
  mainWindow.webContents.send('update_available');
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
