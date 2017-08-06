"use strict";
exports.__esModule = true;
var path = require("path");
var webpack = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");
var env = process.env.NODE_ENV || 'development';
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});
var config = {
    entry: {
        app: [
            // 'babel-polyfill',
            path.resolve(__dirname, 'dist/main.js')
        ]
    },
    devtool: 'eval-source-map',
    output: {
        pathinfo: true,
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    watch: true,
    plugins: [
        definePlugin,
        new WebpackNotifierPlugin({
            excludeWarnings: true
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'dist') }
        ]
    },
    devServer: {
        historyApiFallback: false,
        inline: true
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {}
    }
};
exports["default"] = config;
