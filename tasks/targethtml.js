/*
 * grunt-targethtml
 * https://github.com/changer/grunt-targethtml
 *
 * Copyright (c) 2012 Ruben Stolk
 * Licensed under the MIT license.
 */

'use strict';

var esprima = require('esprima');

function conditionalParser (target, expression) {
  switch(expression.type) {
    case 'LogicalExpression':
      if (expression.operator !== '||') { // we only compare one variable so && is useless
        throw new Error('Syntax not supported');
      }
      return conditionalParser(target, expression.left) || conditionalParser(target, expression.right);
    case 'UnaryExpression':
      if (expression.operator !== '!') {
        throw new Error('Syntax not supported');
      }
      return !conditionalParser(target, expression.argument);
    case 'Identifier':
      return target===expression.name;
    default :
      throw new Error('Syntax not supported');
  }
}

module.exports = function(grunt) {

  grunt.registerMultiTask('targethtml', 'Produces html-output depending on grunt release version', function() {

    var target = this.target,
        path = require('path'),
        options = this.options({
          curlyTags: {}
        });

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        var dest, statement;

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
          contents = contents.replace(new RegExp('<!--[\\[\\(]if target (.*?)[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->', 'g'), function(match, $1, $2, $3) {
            // check if it's really targeted
            if (!conditionalParser(target, esprima.parse($1).body[0].expression)) {
              return '';
            }

            // Process any curly tags in content
            return $3.replace(/\{\{([^{}]*)\}\}/g, function(match, search) {
              var replace = options.curlyTags[search];
              return ('string' === typeof replace) ? replace : match;
            });
          });
          grunt.file.write(dest, contents);
        }

        grunt.log.ok('File "' + dest + '" created.');

        });
    });

    if (this.errorCount) { return false; }
  });
};
