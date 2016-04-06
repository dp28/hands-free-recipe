var ExtractTextPlugin = require("extract-text-webpack-plugin");

var stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader");

module.exports = {
  entry: {
    "app": "./src/app.js"
  },
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.jsx?$/, loader: "react-hot!babel", exclude: /node_modules/ },
      { test: /\.jade$/, loader: "jade", exclude: /node_modules/ },
      { test: /\.styl$/, loader: stylusLoader, exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  plugins: [new ExtractTextPlugin("[name].css", { allChunks: true })]
};
