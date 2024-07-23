
module.exports = {
    entry: ['./src/css/main.css','./src/index.js'],
    output:{
        assetModuleFilename: '[name][ext]'
    },
    module:{
            rules: [
                {
                    test: /\.(ico|svg)$/,
                    type: 'asset/resource'
                }
            ]
    }
}