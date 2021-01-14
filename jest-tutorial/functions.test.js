const functions = require("./functions");

test("adds 2 + 2 and returns", () => {
  expect(functions.add(2, 2)).toBe(4);
});

test("adds 2+2 to not be 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

test("returns null", () => {
  expect(functions.isNull()).toBeFalsy();
});
