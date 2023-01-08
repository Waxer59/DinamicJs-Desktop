const path = require('path');

module.exports = {
  packagerConfig: {
    icon: '/dist/images/favicon'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        icon: '/dist/images/favicon'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: '/dist/images/android-chrome-512x512'
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: '/dist/images/android-chrome-512x512'
      }
    }
  ]
};
