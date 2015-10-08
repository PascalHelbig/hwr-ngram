'use strict';

var ngram = [];

function positionInNgram(a) {
  for (var i = 0; i < ngram.length; i++) {
    if (arraysEqual(ngram[i].a, a)) {
      return i;
    }
  }
  return -1;
}

function arraysEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

module.exports = {

  n: 2,

  predictOnlyNext: true,

  seperator: /[A-Z]+/ig,

  learn: function (input) {
    var words = input.match(this.seperator);
    for (var i = 0; i < words.length - this.n + 1; i++) {
      var a = [];
      for (var j = 0; j < this.n - 1; j++) {
        a.push(words[i + j].toLowerCase());
      }

      var b = '';
      if (this.predictOnlyNext) {
        b = words[i + this.n - 1];
      } else {
        for (var k = i + this.n - 1; k < words.length; k++) {
          b += words[k];
        }
      }
      // is word a in ngram?
      var position = positionInNgram(a);
      if (position > -1) {
        // is word a->b not in ngram
        if (ngram[position].b.indexOf(b) === -1) {
          ngram[position].b.push(b);
        }
      } else {
        ngram.push({
          a: a,
          b: [b]
        });
      }
    }
  },

  prediction: function (input) {
    input = input.match(this.seperator);
    if (input === null || input.length < this.n - 1) {
      return [];
    }

    // Build a:
    var a = [];
    for (var i = input.length - this.n + 1; i < input.length; i++) {
      a.push(input[i].toLowerCase());
    }
    var position = positionInNgram(a);
    if (position > -1) {
      return ngram[position].b;
    }
    return [];
  },

  clean: function () {
    ngram = [];
  }
};
