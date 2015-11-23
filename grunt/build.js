var Jspm = require('jspm');
var Fs  = require('fs');
var Path = require('path');
var options = {
    entry: 'src/main',
    dist: 'dist/stencil-utils.min.js',
    minify: true,
    sourceMaps: false
};

module.exports = function(grunt) {
    grunt.registerTask('build', 'Builds a self executing bundle with JSPM', function() {
        var done = this.async();
        try{
            Fs.statSync(Path.join(process.cwd(), 'jspm_packages'));
        } catch(err) {
            grunt.fail.fatal('Folder "jspm_packages" does not exist. Please run "jspm install" first');
        }

        Jspm.setPackagePath(process.cwd());
        Jspm.bundleSFX(options.entry, options.dist, {minify: options.minify, sourceMaps: options.sourceMaps}).then(function () {
            done();
        }).catch(function(err, param2) {
            grunt.fail.fatal(err);
        });
    });
};
