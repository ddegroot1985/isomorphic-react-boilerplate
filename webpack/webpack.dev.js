/* eslint-disable import/no-extraneous-dependencies */

const common = require('./webpack.common.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const browserConfig = merge(common[0], {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    stats: 'minimal',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true, plugins: [autoprefixer] } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html',
            hash: true
        })
    ]
});

const serverConfig = merge(common[1], {
    mode: 'development',
    stats: 'minimal',
    devtool: 'eval-source-map'
});

module.exports = [browserConfig, serverConfig];
