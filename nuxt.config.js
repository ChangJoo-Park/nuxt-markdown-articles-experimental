const LOCALES = ['ko', 'en']

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [ 'nuxt-i18n' ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      }
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader'
      })
    }
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    vueI18n: {
      fallbackLocale: 'ko',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        ko: {
          welcome: '환영합니다.'
        }
      }
    }
  },
  hooks: {
    build: {
      done(builder) {
        const fs = require('fs')
        const path = require('path')
        const recursive = require('recursive-readdir')

        const makeContentsJSON = async () => {
          const ignoreNotMarkdown = (file, stats) => stats.isDirectory() && path.extname(file) !== '.md';

          LOCALES.forEach(locale => {
            recursive(`./articles/${locale}`, [ignoreNotMarkdown])
            .then(files => {
              fs.writeFileSync(`./articles/${locale}.json`, JSON.stringify(files), 'utf8')
            })
          })
        }
        makeContentsJSON()
      }
    }
  }
}
