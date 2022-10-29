module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "DinamicJs",
        icon: './images/favicon.ico'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin','linux']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: './images/favicon.ico'
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './images/favicon.ico'
      }
    }
  ]
};
