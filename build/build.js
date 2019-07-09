// build配置参考 https://www.jianshu.com/p/c674be93bdd6
require('./check-version')()
process.env.NODE_ENV = 'production'
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpckConfig = require('./webpack.prod.conf')
var spinner = ora('building for production...')
spinner.start()
// https://www.npmjs.com/package/rimraf
// 删除上次打包生成的文件
rm(path.join(config.build.assetRoot, config.build.assetSubDirectory), err => {
    if (err) throw err //如果回调函数出现错误就抛出异常
    // 开始webpack 编译
    webpack(webpckConfig, function(err, stats) { // 编译回调函数
        spinner.stop()
        if (err) throw err // 编译失败就抛出异常
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
