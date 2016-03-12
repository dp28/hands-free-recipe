module.exports = {
  entry: {
    background: "./src/background.js",
    "content-script": "./src/content-script.js",
    popup: "./src/popup.js",
    options: "./src/options.js",
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
