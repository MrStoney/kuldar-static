var utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: true,
    extract: false,
    test: /\.css$/,
    scss: 'vue-style-loader!css-loader!sass-loader'
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
