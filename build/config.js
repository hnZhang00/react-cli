var path = require('path')
var proxyTarget = {
  target : 'http://172.16.1.244',
  changeOrigin: true
};

module.exports = {
  dev: {
    port: 9080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    errorOverlay: true,
    notifyOnErrors: true,
    cssSourceMap: false,
    proxyTable: {
      '/token': proxyTarget,
    }
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/pc/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}
