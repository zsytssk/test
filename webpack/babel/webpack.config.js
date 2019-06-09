"use strict";
const path = require("path");

let common_config = {
  entry: ["./src/main.js"],
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist")
  },
  resolve: {
    extensions: [".jsx", ".js", ".ts"]
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: "babel-loader"
      }
    ]
  }
};

const dev_config = {
  devtool: "cheap-module-eval-source-map",
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "dist")
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    return Object.assign(common_config, dev_config);
  } else {
    return common_config;
  }
};
