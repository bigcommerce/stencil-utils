const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'stencil-utils.min.js',
        library: ['stencilUtils'],
    },
    optimization: {
        minimize: true,
    },
    devtool: false,
    bail: true,
    watch: false,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        compact: false,
                        comments: false,
                    },
                },
            },
        ],
    },
};
