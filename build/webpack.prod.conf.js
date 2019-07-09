var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

var CopyWebpackPlugin = require('copy-webpack-plugin')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#souorce-map' : false,

    output: {
        path: config.build.assetRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process_env': env
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),

        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

if (config.build.productionGZip) {
    var CompressionWebPackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebPackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + 
                config.build.productionGZipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnaylyzerReport) {
    var BundleAnaylyzerReport = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig