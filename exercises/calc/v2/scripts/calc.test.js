const calc = require('./calc');

const badExpression = 'Bad Expression';

test('Invokes execute equation by passing 2 num and 1 opr', () => {
  expect(calc.processEquation([7, 'x', 4, '-', 3, '/', 2])).toBe(12.5);
  expect(calc.processEquation([7, 'x', 4, '/', 0, '/', 2])).toBe(badExpression);
  expect(calc.processEquation([7, 'x', 4, '-', 3, '/', 2.5])).toBe(10);
});

test('Takes positive 2 numbers and returns result', () => {
  expect(calc.executeEquation(2, '+', 5)).toBe(7);
  expect(calc.executeEquation(5.6, '-', 1)).toBe(4.6);
  expect(calc.executeEquation(4, 'x', 5)).toBe(20);
  expect(calc.executeEquation(5000, '/', 3)).toBe(1666.66667);
});

test('One or both numbers are negative', () => {
  expect(calc.executeEquation(-2, '+', -5)).toBe(-7);
  expect(calc.executeEquation(-5, '-', 1)).toBe(-6);
  expect(calc.executeEquation(-5, '-', -3)).toBe(-2);
  expect(calc.executeEquation(-4, 'x', -5)).toBe(20);
  expect(calc.executeEquation(-4, 'x', 7)).toBe(-28);
  expect(calc.executeEquation(5000, '/', -3)).toBe(-1666.66667);
  expect(calc.executeEquation(-5000, '/', -3)).toBe(1666.66667);
});

test('One or both number are percentage', () => {
  expect(calc.processEquation([2, '+', '50%'])).toBe(3);
  expect(calc.processEquation([5, '-', '10%'])).toBe(4.5);
  expect(calc.processEquation(['50%', 'x', '10%'])).toBe(0.05);
  expect(calc.processEquation(['50%', '+', 5])).toBe(5.5);
  expect(calc.processEquation(['50%', '/', 5])).toBe(0.1);
});

// Test Exception Handling

test('Bad expressions should return error', () => {
  expect(calc.executeEquation(5000, '/', 0)).toBe(badExpression);
  expect(calc.executeEquation(0, '/', 0)).toBe(badExpression);
  expect(calc.executeEquation(5000, 'x', 0)).not.toBe(badExpression);
});
