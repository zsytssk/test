"use strict";
const path = require("path");

module.exports = {
  entry: {
    "main.min": "./src/main.ts"
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/")
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(.*)?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.webpack.json",
          transpileOnly: true
        }
      }
    ]
  },
  watch: true,
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist")
  }
};
