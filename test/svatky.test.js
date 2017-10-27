var assert = require('assert');
var getNamedayFor = require('../svatky.js').getNamedayFor;
const moment = require('moment-timezone');


describe('getNamedayFor', function() {
  it('returns correct nameday greeting', function() {
    assert.equal(getNamedayFor(moment("20170103")), 'Dnes ma svátek Radmila');
    assert.equal(getNamedayFor(moment("20170105")), 'Dnes ma svátek Dalimil a Dalemil');
    assert.equal(getNamedayFor(moment("20170102")), 'Dnes ma svátek Karina, Karína a Karin');
  });

  it('returns empty string for day without nameday', function () {
    assert.equal(getNamedayFor(moment("20170101")), '');
  });
});
