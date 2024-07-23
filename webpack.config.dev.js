const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.config.common.js') 
const { merge } = require('webpack-merge')

module.exports = merge({
    plugins: [new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
        inject: 'body',
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css"
    }),
],
    devtool: 'source-map',
    mode: 'development',
    output:{
        filename: 'main.js',
        path: __dirname + '/dist'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}, commonConfig)