'use strict';
const path = require('path');

module.exports = {
  entry: ['./src/main.ts'],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'laya/src'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(.*)?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json',
          transpileOnly: true,
          compilerOptions: {
            target: 'es5',
            sourceMap: false,
            lib: ['dom', 'es5', 'es2015.promise'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'laya'),
  },
};
