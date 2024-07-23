const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: ['./src/css/main.css','./src/index.js'],
    plugins:[new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
    })],
    output:{
        assetModuleFilename: '[name][ext]'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(ico|svg)$/,
                type: 'asset/resource'
            }
        ]
    }
}