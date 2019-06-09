'use strict';
const webpack = require('webpack');

module.exports = {
  entry: [
    './trc/main.ts'
  ],
  output: {
    path: __dirname + '\\laya\\src',
    filename: 'fish.min.js'
  },
  module: {
    rules: [{
      test: /\.(.*)?$/,
      loader: 'babel-loader',
      query: {
        presets: ["typescript", ["env", {
          "targets": {
            "browsers": ["last 2 versions", "safari >= 7"]
          }
        }]],
        plugins: ["transform-class-properties"]
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    })
  ]
}