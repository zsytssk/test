'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let common_config = {
  devtool: 'source-map',
  watch: true,
  node: {
    __dirname: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = [
  Object.assign({}, common_config, {
    target: 'electron-main',
    entry: {
      main: './src/main/main.ts',
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/main'),
    },
  }),
  Object.assign({}, common_config, {
    target: 'electron-renderer',
    entry: {
      ui: './src/renderer/main.tsx',
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/renderer'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/renderer/index.html',
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, './'),
    },
  }),
];
