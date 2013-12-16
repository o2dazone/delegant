module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    casperjs: {
      files: ['casperjs/*.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'src/<%= pkg.name %>.min.js'
      }
    }
  });


  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['casperjs','uglify']);
};