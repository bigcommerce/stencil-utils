module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        jitGrunt: true
    });

    require('./grunt/build')(grunt);

    grunt.registerTask('default', ['eslint', 'karma', 'build'])
};
