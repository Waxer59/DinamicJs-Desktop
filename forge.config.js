module.exports = {
  packagerConfig: {
    icon: 'dist/images/favicon.ico'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'DinamicJs',
        icon: 'dist/images/favicon.ico',
        setupIcon: 'dist/images/favicon.ico'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: 'dist/images/android-chrome-512x512.png'
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: 'dist/images/android-chrome-512x512.png'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      config: {
        icon: 'dist/images/android-chrome-512x512.png'
      },
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: 'dist/images/android-chrome-512x512.png'
      }
    }
  ]
};
