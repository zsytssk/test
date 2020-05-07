'use strict';
const path = require('path');
const webpack = require('webpack');
const findParam = require('./script/findEnv');

const ENV = JSON.stringify(findParam('ENV'));
const common_config = {
    entry: ['./src/main.ts'],
    output: {
        filename: 'js/bundle.js',
        path: path.join(__dirname, 'build'),
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /(\.ts|\.js)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new webpack.DefinePlugin({ ENV })],
};

const dev_config = {
    devtool: 'eval-source-map',
    stats: {
        warnings: false,
    },
    watch: ENV === 'DEV' ? true : false,
    devServer: {
        clientLogLevel: 'silent',
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'build'),
        disableHostCheck: true,
    },
};

const prod_config = {
    entry: ['./src/main.ts'],
};

module.exports = (env, argv) => {
    if (ENV !== 'PROD') {
        const dist_folder = path.join(__dirname, 'build');
        common_config.output.path = dist_folder;
        dev_config.devServer.contentBase = dist_folder;
    }
    console.log(`test:>`, common_config.output.path);
    if (argv.mode === 'development') {
        common_config.module.rules[0].use.unshift({ loader: 'babel-loader' });
        const result = { ...common_config, ...dev_config };
        return result;
    } else {
        common_config.module.rules[0].use.unshift({ loader: 'babel-loader' });
        const result = { ...common_config, ...prod_config };
        return result;
    }
};
