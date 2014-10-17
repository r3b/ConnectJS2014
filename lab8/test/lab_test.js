'use strict';

var lab = require('../lib/lab.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(lab.awesome(), 'awesome', 'should be awesome.');
    test.done();
  },
  'isString - no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(lab.isString(), null, 'should be null.');
    test.done();
  },
  'isString - one string': function(test) {
    test.expect(1);
    // tests here

    test.equal(lab.isString('awesome')[0], 'awesome is a string.', 'should be a string.');
    test.done();
  },
  'isString - one number': function(test) {
    test.expect(1);
    // tests here
    test.equal(lab.isString(1)[0], '1 is not a string.', 'should not be a string.');
    test.done();
  },
  'isString - multiple args': function(test) {
    test.expect(1);
    // tests here
    test.equal(lab.isString(['awesome', 1]).length, 2, 'should return 2 results.');
    test.done();
  },
};
