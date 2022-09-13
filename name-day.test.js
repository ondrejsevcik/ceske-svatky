const nameDay = require("./name-day.js");

describe("getNameDayFor", () => {
  it("returns correct nameday greeting", () => {
    expect(nameDay.getNameDayFor(new Date("2017-01-03"))).toBe("Radmila");
    expect(nameDay.getNameDayFor(new Date("2017-01-05"))).toBe(
      "Dalimil a Dalemil"
    );
    expect(nameDay.getNameDayFor(new Date("2017-01-02"))).toBe(
      "Karina, Karína a Karin"
    );
    expect(nameDay.getNameDayFor(new Date("2017-01-01"))).toBe("");
  });
});

describe("getPoster", () => {
  it("returns base64 encoded poster", async () => {
    let poster = await nameDay.getPoster({ date: new Date() });
    expect(typeof poster).toBe("string");
  }, 60000);
});
