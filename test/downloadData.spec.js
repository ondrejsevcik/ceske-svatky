var assert = require('assert');
var downloadData = require('../downloadData.js').downloadData;

describe('downloadData', function() {
  it('a', function() {
    var expected = [];

    return downloadData()
      .then((result) => assert.equal(result, expected));
  });
});
