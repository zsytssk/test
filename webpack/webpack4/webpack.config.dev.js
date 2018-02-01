"use strict";
const path = require("path");

module.exports = {
  devtool: "eval-source-map",
  entry: {
    "main.min": "./src/main.ts",
    test: "./src/test.ts"
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/")
  },
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
    contentBase: path.join(__dirname, "laya")
  }
};
