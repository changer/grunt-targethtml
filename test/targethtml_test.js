'use strict';

var grunt = require('grunt');

exports.targethtml = function(test){

  var expected, result;

  test.expect(8);

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


  expected = grunt.file.read('test/expected/foo.html');
  result = grunt.file.read('tmp/foo.html');
  test.equal(result, expected, 'should process :foo target');
  expected = grunt.file.read('test/expected/bar.html');
  result = grunt.file.read('tmp/bar.html');
  test.equal(result, expected, 'should process :bar target');

  expected = grunt.file.read('test/expected/single-quoted-literal-target.html');
  result = grunt.file.read('tmp/single-quoted-literal-target.html');
  test.equal(result, expected, 'should process :\'single-quoted-literal-target\' target');

  expected = grunt.file.read('test/expected/double-quoted-literal-target.html');
  result = grunt.file.read('tmp/double-quoted-literal-target.html');
  test.equal(result, expected, 'should process :"double-quoted-literal-target" target');

  test.done();

};
