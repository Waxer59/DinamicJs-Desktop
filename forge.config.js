module.exports = {
  packagerConfig: {
    icon: 'dist/images/favicon.ico',
    ignore: [
      '^/public$',
      '^/src$',
      '[.](github|husky|template.env|env|eslintrc.json|prettierignore|prettierrc|gitignore)$',
      'LICENSE.md',
      'README.md',
      'vite.config.js',
      'forge.config.js'
    ]
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
