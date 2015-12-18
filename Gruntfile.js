module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            dist: {
                src: ['src/**/*.js'],
                dest: 'resources/scripts/app.js'
            }
        },
        watch: {
            files: ['src/*/*.js'],
            tasks: ['concat']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};