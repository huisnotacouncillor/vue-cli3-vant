const path = require('path')
module.exports = {
    // 生产环境配置
    build: {
        // 使用config/prod.config.js中定义的编译环境
        env: require('./prod.config'),
        index: path.resolve(__dirname, '../dist/index.html'), // 编译注入的index.html文件，必须是本地绝对路径
        assetRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态文件根路径
        assetSubDirectory: 'static', // 编译输出的二级目录
        assetPublicPath: '/', // 编译发布上限的根目录，可配置成服务器域名或者CDN域名
        productionSourceMap: true, //生成用于生产构建的源映射

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGZip: false, // 是否开启gzip
        productionGZipExtensions: ['js', 'css'],  //需要使用gzip压缩的文件拓展名

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        // https://www.npmjs.com/package/webpack-bundle-analyzer
        bundleAnaylyzerReport: process.env.npm_config_report, //  //一个实用工具,用于分析项目的依赖关系
    },
    dev: {
        env: require('./dev.config'),
        port: 10010, // 运行测试页面的端口
        autoOpenBrowser: false, // 是否自动打开浏览器
        assetSubDirectory: 'static', // 编译输出的二级目录
        assetPublicPath: '/', //
        proxyTable: {

        },
        
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    }
}
