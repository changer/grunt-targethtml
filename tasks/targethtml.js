/*
 * grunt-targethtml
 * https://github.com/changer/grunt-targethtml
 *
 * Copyright (c) 2012 Ruben Stolk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('targethtml', 'Preproces HTML files depending on current grunt target', function() {
    var options = this.options({
      versionTags: {}
    });

    // Process src-dest files
    this.files.forEach(function(file) {
      var contents = grunt.file.read(file.src);

      if (contents) {
        contents = contents.replace(new RegExp('<!--[\\[\\(]if target ' + this.target + '[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->', 'g'), function(match, $1, $2) {
          // Process any template tags in content
          return $2.replace(/\{\{([^{}]*)\}\}/g, function(match, search) {
            var replace = options.versionTags[search];
            return ('string' === typeof replace) ? replace : match;
          });
        });
        contents = contents.replace(new RegExp('^[\\s\\t]+<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'gm'), '');
        contents = contents.replace(new RegExp('<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'g'), '');
        grunt.file.write(file.dest, contents);

        // print a success message.
        grunt.log.ok('File "' + file.dest + '" created.');
      }
    }.bind(this));

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

  });
};
