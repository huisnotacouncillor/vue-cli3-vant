const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
    outputDir: 'docs',
    publicPath: process.env.NODE_ENV === 'production' ? '/vant-test' : '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtoviewport({
                        rootValue: 375,
                        selectorBlackList: ['van-circle__layer']
                    })
                ]
            }
        }
    }
}