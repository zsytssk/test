'use strict';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.ts',
    },
    output: {
        path: path.join(__dirname, 'bin/js'),
        publicPath: 'js',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    watch: true,
    resolve: {
        modules: [
            path.resolve('./libs'),
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
        extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /(\.ts|\.js)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['bin'],
        }),
    ],
};
