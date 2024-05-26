const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.config.common.js') 
const { merge } = require('webpack-merge')

module.exports = merge({
    plugins: [new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
        inject: 'body',
        showErrors: false
    })],
    mode: 'production',
    output:{
        filename: '[name].js',
        path: __dirname + '/build'
    }
}, commonConfig)