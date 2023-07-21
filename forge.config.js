module.exports = {
  packagerConfig: {
    icon: './.vite/build/images/favicon.ico',
    ignore: [
      '^/public$',
      '^/src$',
      '[.](github|husky|template.env|env|eslintrc.json|prettierignore|prettierrc|gitignore)$',
      'LICENSE.md',
      'README.md',
      'vite.config.js',
      'forge.config.js'
    ],
    asar: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'DinamicJs',
        iconUrl:
          'https://raw.githubusercontent.com/Waxer59/DinamicJs-Desktop/main/public/images/favicon.ico',
        setupIcon: './images/favicon.ico'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: './.vite/build/images/android-chrome-512x512.png'
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './.vite/build/images/android-chrome-512x512.png'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      config: {
        icon: './.vite/build/images/android-chrome-512x512.png'
      },
      platforms: ['darwin']
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    },
    {
      name: '@electron-forge/plugin-vite',
      config: {
        build: [
          {
            entry: 'main.js',
            config: 'vite.main.config.js'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.js'
          }
        ]
      }
    }
  ]
};
