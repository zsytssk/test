"use strict";
const path = require("path");

let common_config = {
  entry: {
    main: "./src/main.ts"
  },
  output: {
    chunkFilename: "[name].chunk.js",
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist/")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(.*)?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
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

const prod_ts_compile_option = {
  target: "es5",
  sourceMap: false,
  lib: ["dom", "es5", "es2015.promise"]
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    return Object.assign(common_config, dev_config);
  } else {
    common_config.module.rules[0].options.compilerOptions = prod_ts_compile_option;
    return Object.assign(common_config);
  }
};
