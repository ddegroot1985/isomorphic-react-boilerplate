/* eslint-disable import/no-extraneous-dependencies */

const autoprefixer = require('autoprefixer');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const browserConfig = merge(common[0], {
    mode: 'production',
    output: {
        filename: '[name].[hash:6].js',
        chunkFilename: '[name].[chunkhash:6].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true, plugins: [autoprefixer] } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[chunkhash:6].css'
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html'
        })
    ]
});

const serverConfig = merge(common[1], {
    mode: 'production',
    devtool: 'source-map'
});

module.exports = [browserConfig, serverConfig];
