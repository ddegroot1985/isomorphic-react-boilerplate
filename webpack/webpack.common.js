/* eslint-disable import/no-extraneous-dependencies */

const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const browserConfig = {
    name: 'browser',
    entry: {
        app: './src/browser.jsx'
    },
    output: {
        path: path.join(__dirname, '../dist/public'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?x$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

const serverConfig = {
    name: 'server',
    target: 'node',
    entry: {
        server: './src/server.js'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js?x$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            }
        ]
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = [browserConfig, serverConfig];
