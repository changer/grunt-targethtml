'use strict';

var grunt = require('grunt');

exports.targethtml = {
  main: function(test) {
    var expected, result;


    test.expect(2);

    result = grunt.file.read('tmp/dev.html');
    expected = grunt.file.read('test/expected/dev.html');
    test.equal(result, expected, 'should process :dev target');

    result = grunt.file.read('tmp/dist.html');
    expected = grunt.file.read('test/expected/dist.html');
    test.equal(result, expected, 'should process :dist target');

    test.done();
  }
};
