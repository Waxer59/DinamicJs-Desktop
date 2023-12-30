module.exports = {
  packagerConfig: {
    icon: '.vite/renderer/main_window/images/favicon.ico',
    ignore: [
      '^/public$',
      '^/src$',
      '^/dist$',
      '[.](github|husky|template.env|env|eslintrc.json|prettierignore|prettierrc|gitignore)$',
      'LICENSE.md',
      'README.md',
      'forge.config.js',
      'vite.main.config.js',
      'vite.renderer.config.js'
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
        setupIcon: '.vite/renderer/main_window/images/favicon.ico'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: '.vite/renderer/main_window/images/icon.png'
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: '.vite/renderer/main_window/images/icon.png'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      config: {
        icon: '.vite/renderer/main_window/images/icon.png'
      },
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: '.vite/renderer/main_window/images/icon.png',
        format: 'ULFO'
      }
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
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Waxer59',
          name: 'DinamicJs-Desktop'
        },
        prerelease: true
      }
    }
  ]
};
