'use strict';

var grunt = require('grunt');

exports.targethtml = function(test){

  var expected, result;

  test.expect(4);

  expected = grunt.file.read('test/expected/dev.html');
  result = grunt.file.read('tmp/dev.html');
  test.equal(result, expected, 'should process :dev target');

  expected = grunt.file.read('test/expected/dist.html');
  result = grunt.file.read('tmp/dist.html');
  test.equal(result, expected, 'should process :dist target');
  result = grunt.file.read('tmp/second.html');
  test.equal(result, expected, 'should process a second :dist target');

  expected = grunt.file.read('test/expected/release.html');
  result = grunt.file.read('tmp/release.html');
  test.equal(result, expected, 'should process :release target');

  test.done();

};
