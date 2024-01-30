const path = require('path');

module.exports = {

  transpileDependencies: ['vuetify'],

  chainWebpack: config => {
    config.resolve.alias.set(
      'node_modules',
      path.join(__dirname, './node_modules')
    );
    config.resolve.alias.set(
      'shared',
      path.join(__dirname, './node_modules/@bmp-vue/core/shared')
    );
    config.resolve.alias.set(
      'theme',
      path.join(__dirname, './src/plugins/vuetify/theme')
    );
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: path.resolve('./node_modules/vue/dist/vue.runtime.esm.js')
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: false
      }
    }
  }
}
