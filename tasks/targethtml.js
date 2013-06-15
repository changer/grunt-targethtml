/*
 * grunt-targethtml
 * https://github.com/changer/grunt-targethtml
 *
 * Copyright (c) 2012 Ruben Stolk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('targethtml', 'Produces html-output depending on grunt release version', function() {

    var target = this.target,
        path = require('path'),
        options = this.options({
          curlyTags: {}
        });

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        var dest;

        if (!grunt.file.exists(src)) {
          grunt.log.error('Source file "' + src + '" not found.');
        }

        if  (grunt.file.isDir(file.dest)) {
          dest = file.dest + path.basename(src);
        } else {
          dest = file.dest;
        }

        var contents = grunt.file.read(src);

        if (contents) {
          contents = contents.replace(new RegExp('<!--[\\[\\(]if target ' + target + '[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->', 'g'), function(match, $1, $2) {
            // Process any curly tags in content
            return $2.replace(/\{\{([^{}]*)\}\}/g, function(match, search) {
              var replace = options.curlyTags[search];
              return ('string' === typeof replace) ? replace : match;
            });
          });
          contents = contents.replace(new RegExp('^[\\s\\t]+<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'gm'), '');
          contents = contents.replace(new RegExp('<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'g'), '');
          grunt.file.write(dest, contents);
        }

        grunt.log.ok('File "' + dest + '" created.');

        });
    });

    if (this.errorCount) { return false; }
  });
};
