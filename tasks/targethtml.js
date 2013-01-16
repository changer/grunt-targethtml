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

    // The source files to be processed. The "nonull" option is used
    // to retain invalid files/patterns so they can be warned about.
    var files = grunt.file.expand({ nonull:true }, this.file.srcRaw);

    // Warn if a source file/pattern was invalid.
    var invalidSrc = files.some(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.error('Source file "' + filepath + '" not found.');
        return true;
      }
    });
    if (invalidSrc) { return false; }

    // Process files
    files.forEach(function(filepath) {
      var contents = grunt.file.read(filepath);

      if (contents) {
        contents = contents.replace(new RegExp('<!--[\\[\\(]if target ' + this.target + '[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->', 'g'), '$2');
        contents = contents.replace(new RegExp('^[\\s\\t]+<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'gm'), '');
        contents = contents.replace(new RegExp('<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'g'), '');
        grunt.file.write(this.file.dest, contents);
      }
    }.bind(this));

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.ok('File "' + this.file.dest + '" created.');
  });
};
