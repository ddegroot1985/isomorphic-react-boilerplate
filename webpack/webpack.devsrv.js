/* eslint-disable import/no-extraneous-dependencies */

const devConfig = require('./webpack.dev.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const devBrowserConfig = devConfig[0];

// Remove the HTMLWebpackPlugin from the config defined in the dev config.
// If we don't do this the HTMLWebpackPlugin gets executed twice with different options.
devBrowserConfig.plugins = devBrowserConfig.plugins.filter((plugin) => {
    return !(plugin instanceof HTMLWebpackPlugin);
});

const browserConfig = merge(devBrowserConfig, {
    devServer: {
        contentBase: path.join(__dirname, 'dist/public'),
        compress: true,
        port: 3000,
        stats: 'errors-only',
        overlay: {
            warnings: true,
            errors: true
        },
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.USING_DEV_SERVER': JSON.stringify(true)
        })
    ]
});

module.exports = browserConfig;
