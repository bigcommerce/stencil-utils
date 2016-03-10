var Fs  = require('fs');
var Path = require('path');
var config = require('../webpack.conf.js');
var webpack = require('webpack');
var options = {
    entry: './src/main.js',
    output: {
        path: Path.resolve(__dirname, '../dist'),
        filename: 'stencil-utils.min.js',
        library: ['stencilUtils']
    },
    devtool: false
};

module.exports = function(grunt) {
    grunt.registerTask('build', 'Builds a distributable bundle of stencil utils', function() {
        var done = this.async();
        var compiler;

        // Don't include source maps for a distributable package
        config.devtool = options.devtool;
        config.entry = options.entry;
        config.output = options.output;
        config.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false
                }
            })
        ];

        compiler = webpack(config);

        compiler.run(function(err, stats) {
            if (err) {
                throw err;
            }

            console.log('Distributable bundle created at: ' + Path.join(options.output.path, options.output.filename));

            done();
        });
    });
};
