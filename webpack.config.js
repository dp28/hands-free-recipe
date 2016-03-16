module.exports = {
  entry: {
    "app": "./src/app/index.js"
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
        { test: /\.jade$/, loader: "jade", exclude: /node_modules/ }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
};
