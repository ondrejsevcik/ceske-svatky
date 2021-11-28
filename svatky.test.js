const svatky = require("./svatky.js");
const moment = require("moment-timezone");

const getNamedayFor = svatky.getNamedayFor;

test("returns correct nameday greeting", function () {
  expect(getNamedayFor(moment("20170103"))).toBe("Radmila");
  expect(getNamedayFor(moment("20170105"))).toBe("Dalimil a Dalemil");
  expect(getNamedayFor(moment("20170102"))).toBe("Karina, Karína a Karin");
});

test("returns empty string for day without nameday", function () {
  expect(getNamedayFor(moment("20170101"))).toBe("");
});
