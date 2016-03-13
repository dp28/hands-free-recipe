module.exports = {
  entry: {
    "recipe-controller": "./src/recipe-controller.js"
  },
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  module: {
    loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.jade$/, exclude: /node_modules/, loader: "jade-loader" }
    ]
  }
};
