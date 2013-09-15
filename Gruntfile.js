/*
 * grunt-targethtml
 * https://github.com/changer/grunt-targethtml
 *
 * Copyright (c) 2012 Igor Hlina
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      gruntfile: 'Gruntfile.js',
      tasks: 'tasks/*.js',
      tests: '<%= nodeunit.tasks %>'
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    targethtml: {
      dev: {
        files: {
          'tmp/dev.html': 'test/fixtures/index.html'
        }
      },
      dist: {
        files: {
          'tmp/dist.html': 'test/fixtures/index.html',
          'tmp/second.html': 'test/fixtures/index.html'
        }
      },
      foo: {
        files: {
          'tmp/foo.html': 'test/fixtures/index.html',
        }
      },
      bar: {
        files: {
          'tmp/bar.html': 'test/fixtures/index.html',
        }
      },
      release: {
        options: {
          curlyTags: {
            cssver: '001',
            jsver: '002'
          }
        },

        files: {
          'tmp/release.html': 'test/fixtures/index.html'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  // Load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');


  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'targethtml', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
