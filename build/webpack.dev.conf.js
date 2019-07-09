var utils = require('./utils')

var webpack = require('webpack')

var config = require('../config')

var merge = require('webpack-merge')

var baseWebConfig = require('./webpack.base.conf')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var FriendyErrorPlugin = require('friendly-errors-webpack-plugin')

Object.keys(baseWebConfig.entry).forEach(function(name) {
    baseWebConfig.entry[name] = ['./build/dev-client'].concat(baseWebConfig.entry[name])
})

module.exports = merge(baseWebConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),

        new FriendyErrorPlugin()
    ]
})