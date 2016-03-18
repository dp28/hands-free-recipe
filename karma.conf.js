var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map'

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'test/index.webpack.js'
    ],
    preprocessors: {
      'test/index.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
