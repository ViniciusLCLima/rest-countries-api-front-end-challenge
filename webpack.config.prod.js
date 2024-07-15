const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.config.common.js') 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require('webpack-merge')

module.exports = merge({
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'index.[hash].html',
            inject: 'body',
            showErrors: false
        }),
        new CssMinimizerPlugin()
    ],
    optimization:{
        minimizer:[
            new CssMinimizerPlugin()
        ]
    },
    mode: 'production',
    output:{
        filename: '[name].[hash].js',
        path: __dirname + '/dist'
    }
}, commonConfig)