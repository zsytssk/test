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
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(.*)?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.webpack.json",
          transpileOnly: true,
          compilerOptions: {
            target: "es5",
            sourceMap: false,
            lib: ["dom", "es5", "scripthost", "es2015.promise"]
          }
        }
      }
    ]
  },
  watch: true,
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
