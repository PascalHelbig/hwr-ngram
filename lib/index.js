'use strict';

var ngram = {};

module.exports = {

  seperator: /[A-Z]+/ig,

  learn: function (input) {
    var words = input.match(this.seperator);
    for (var i = 0; i < words.length - 1; i++) {
      var a = words[i].toLowerCase();
      var b = words[i + 1];
      // is word a in ngram?
      if (a in ngram) {
        // is word a->b not in ngram
        if (ngram[a].indexOf(b) === -1) {
          ngram[a].push(b);
        }
      } else {
        ngram[a] = [b];
      }
    }
  },

  prediction: function (input) {
    input = input.match(this.seperator);
    if (input === null) {
      return [];
    }
    input = input[input.length - 1];
    input = input.toLowerCase();
    if (input in ngram) {
      return ngram[input];
    }
    return [];
  }
};
