require('./check-version')
var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')


var port = process.env.PORT || config.dev.PORT

var autoOpenBrowser = !!config.dev.autoOpenBrowser
var proxyTable = config.dev.proxyTable
var app = express()
var compiler = webpack(webpackConfig)
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
})

compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

var proxy = require('express-http-proxy')
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    // if (typeof options === 'string') {
    //     options = { target: options }
    // }
    // app.use(proxyMiddleware(options.filter || context, options))
    var apiProxy = proxy(typeof options === 'string' ? options: options.target, {})
    app.use(context, apiProxy)
})
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

var staticPath = path.posix.join(config.dev.assetPublicPath, config.dev.assetSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
