'use strict';

var assert = require('assert');
var ngram = require('../lib');

describe('ngram', function () {

  it('should return empty arrays if nothing was learned.', function () {
    ngram.clean();
    ngram.n = 2;
    assert.deepEqual(ngram.prediction(''), []);
    assert.deepEqual(ngram.prediction('abc'), []);
  });

  it('should return every prediction for every word (except the last one)', function () {
    ngram.clean();
    ngram.n = 2;
    ngram.learn('I love working with node');
    assert.deepEqual(ngram.prediction('I'), ['love']);
    assert.deepEqual(ngram.prediction('love'), ['working']);
    assert.deepEqual(ngram.prediction('working'), ['with']);
    assert.deepEqual(ngram.prediction('with'), ['node']);
    assert.deepEqual(ngram.prediction('node'), []);
  });

  it('should return two words if two prediction was learned', function () {
    ngram.clean();
    ngram.n = 2;
    ngram.learn('I love working with node');
    ngram.learn('I love you');
    assert.deepEqual(ngram.prediction('love'), ['working', 'you']);
  });

  it('should not learn the same combination twice', function () {
    ngram.clean();
    ngram.n = 2;
    ngram.learn('she like cats');
    ngram.learn('she like cats');
    ngram.learn('she like cats');

    assert.deepEqual(ngram.prediction('she'), ['like']);
  });

  it('should ignore upper and lower case', function () {
    ngram.clean();
    ngram.n = 2;
    ngram.learn('animals are awesome');
    assert.deepEqual(ngram.prediction('ANimALs'), ['are']);
  });

  it('shoud use the last word, if the prediction got a sentence', function () {
    ngram.clean();
    ngram.n = 2;
    ngram.learn('she like cats');
    assert.deepEqual(ngram.prediction('she like'), ['cats']);
  });

  it('should work as trigram', function () {
    ngram.clean();
    ngram.n = 3;
    ngram.learn('JavaScript is easy');
    ngram.learn('CoffeeScript is simple');
    assert.deepEqual(ngram.prediction('JavaScript is'), ['easy']);
  });

  it('should work letter by letter', function () {
    ngram.clean();
    ngram.n = 3;
    ngram.seperator = /[A-Z]/ig;
    ngram.predictOnlyNext = false;
    ngram.learn('JavaScript');
    ngram.learn('Java');
    ngram.learn('James');
    assert.deepEqual(ngram.prediction('Ja'), ['vaScript', 'va', 'mes']);
    assert.deepEqual(ngram.prediction('Jav'), ['aScript', 'a']);
  });
});
