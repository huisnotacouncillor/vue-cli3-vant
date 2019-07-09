'use-strict'
const merge = require('webpack-merge')
const prodENV = require('./prod.config')

module.exports = merge(prodENV, {
    NODE_ENV: '"development"'
})