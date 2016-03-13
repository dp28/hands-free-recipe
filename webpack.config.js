module.exports = {
  entry: {
    "recipe-controller": "./src/controllers/recipe-controller.js"
  },
  output: {
    path: "./dist",
    filename: "[name].js"
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
