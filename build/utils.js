var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
    var assetSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetSubDirectory
    : config.dev.assetSubDirectory
    return path.posix.join(assetSubDirectory, _path)
}
exports.cssLoaders = function(options) {
    options = options || {}
    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }
    function generateLoaders (loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    soourceMap: options.sourceMap
                })
            })
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loader,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus')
    }
}
exports.styleLoaders = function(options) {
    var ouput = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        ouput.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
        return ouput
    }
}
