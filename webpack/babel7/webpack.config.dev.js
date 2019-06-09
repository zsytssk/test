"use strict";
const path = require("path");
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: ["./trc/main.ts"],
  output: {
    path: path.join(__dirname, "laya/src"),
    filename: "fish.min.js"
  },
  module: {
    rules: [
      {
        test: /\.(.*)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          plugins: ["lodash", "transform-class-properties"],
          presets: ["typescript"]
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
  },
  plugins: [new LodashModuleReplacementPlugin({ collections: true })]
};
