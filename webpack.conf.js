module.exports = {
    devtool: 'inline-source-map',
    bail: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    compact: false,
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }
        ]
    },
    watch: false
};
