module.exports = [{
    entry: ['./index.js'],
    output: { filename: './analytics.js' },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        }]
    },
    node: {
        fs: 'empty'
    }
}];
