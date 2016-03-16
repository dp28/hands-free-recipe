var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map'

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'test/test-helper.js',
      'test/index.webpack.js'
    ],
    preprocessors: {
      'test/test-helper.js': [ 'webpack', 'babel' ],
      'test/index.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
