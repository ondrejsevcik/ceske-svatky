const svatky = require("./svatky.js");

const getNamedayFor = svatky.getNamedayFor;

test("returns correct nameday greeting", function () {
  expect(getNamedayFor(new Date("2017-01-03"))).toBe("Radmila");
  expect(getNamedayFor(new Date("2017-01-05"))).toBe("Dalimil a Dalemil");
  expect(getNamedayFor(new Date("2017-01-02"))).toBe("Karina, Karína a Karin");
});

test("returns empty string for day without nameday", function () {
  expect(getNamedayFor(new Date("2017-01-01"))).toBe("");
});
