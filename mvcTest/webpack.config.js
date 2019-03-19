'use strict';
const path = require('path');

const common_file_list = ['./src/main.ts'];
const dev_file_list = ['./src/test/test.ts'].concat(common_file_list);
const prod_file_list = ['es6-promise/auto'].concat(common_file_list);

let common_config = {
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'laya/src'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
};

const dev_config = {
    entry: dev_file_list,
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, 'laya'),
    },
};

const prod_config = {
    entry: prod_file_list,
};

const prod_ts_compile_option = {
    target: 'es5',
    sourceMap: false,
    lib: ['dom', 'es5', 'es2015.promise'],
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        return Object.assign(common_config, dev_config);
    } else {
        common_config.module.rules[0].options.compilerOptions = prod_ts_compile_option;
        return Object.assign(common_config, prod_config);
    }
};
