module.exports = {
  entry: {
    "content-script-controller": "./src/controllers/content-script-controller.js"
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
        { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
        { test: /\.jade$/, loader: "jade-loader", exclude: /node_modules/ }
    ]
  }
};
