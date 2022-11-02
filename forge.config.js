const path = require('path');

module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  config: {
    forge: {
      packagerConfig: {
        icon: path.join(__dirname, 'public', 'android-chrome-512x512.ico')
      }
    }
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        icon: path.join(__dirname, 'public', 'android-chrome-512x512.ico')
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: path.join(__dirname, 'public', 'android-chrome-512x512.ico')
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: path.join(__dirname, 'public', 'android-chrome-512x512.ico')
      }
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        icon: path.join(__dirname, 'public', 'android-chrome-512x512.ico')
      }
    }
  ],
};
