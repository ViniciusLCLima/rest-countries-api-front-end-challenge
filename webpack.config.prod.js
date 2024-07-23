const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.config.common.js') 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge({
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'index.[hash].html',
            inject: 'body',
            showErrors: false
        }),
        new CssMinimizerPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        })
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