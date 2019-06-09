// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./jsrc/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Getting started with WASM"
    })
  ],
  module: {
    rules: [
      {
        test: /\.rs$/,
        use: [
          {
            loader: "rust-native-wasm-loader",
            options: {
              release: true
            }
          }
        ]
      }
    ]
  },
  mode: "development"
};
