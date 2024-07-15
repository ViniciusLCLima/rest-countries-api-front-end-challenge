const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: ['./src/css/main.css','./src/index.js'],
    plugins:[new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
    })],
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}