'use strict';

var assert = require('assert');
var bigram = require('../lib');

describe('bigram', function () {

  it('should return empty arrays if nothing was learned.', function () {
    assert.deepEqual(bigram.prediction(''), []);
    assert.deepEqual(bigram.prediction('abc'), []);
  });

  it('should return every prediction for every word (except the last one)', function () {
    bigram.learn('I love working with node');
    assert.deepEqual(bigram.prediction('I'), ['love']);
    assert.deepEqual(bigram.prediction('love'), ['working']);
    assert.deepEqual(bigram.prediction('working'), ['with']);
    assert.deepEqual(bigram.prediction('with'), ['node']);
    assert.deepEqual(bigram.prediction('node'), []);
  });

  it('should return two words if two prediction was learned', function () {
    bigram.learn('I love you');
    assert.deepEqual(bigram.prediction('love'), ['working', 'you']);
  });

  it('should not learn the same combination twice', function () {
    bigram.learn('she like cats');
    bigram.learn('she like cats');
    bigram.learn('she like cats');

    assert.deepEqual(bigram.prediction('she'), ['like']);
  });

  it('should ignore upper and lower case', function () {
    bigram.learn('animals are awesome');
    assert.deepEqual(bigram.prediction('ANimALs'), ['are']);
  });

  it('shoud use the last word, if the prediction got a sentence', function () {
    bigram.learn('she like cats');
    assert.deepEqual(bigram.prediction('she like'), ['cats']);
  });
});
