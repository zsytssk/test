"use strict";
const path = require("path");

module.exports = {
  entry: {
    "main.min": "./src/main.ts",
    vendor: ["rxjs", "lodash", "redux"]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
    path: path.join(__dirname, "dist/")
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true
        }
      }
    }
  },
  // mode: "development",
  mode: "production",
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
