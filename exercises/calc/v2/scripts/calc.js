let Decimal = require('decimal.js');
const badExpression = 'Bad Expression';

function isValidOpr(opr) {
  const operators = ['+', '-', 'x', '*', '/'];
  return operators.includes(opr);
}

function processEquation(equation) {
  let opr = '';

  let answer = equation.reduce((acc, cur) => {
    if (acc === badExpression) return badExpression;
    if (isValidOpr(cur)) {
      opr = cur;
    } else {
      if (acc.toString().includes('%')) {
        acc = Number(acc.toString().replace('%', '')) / 100;
      }

      if (cur.toString().includes('%')) {
        cur = Number(cur.toString().replace('%', '')) / 100;
        cur = executeEquation(1, opr, cur);
        opr = 'x';
      }
      acc = executeEquation(acc, opr, cur);
    }
    return acc;
  });
  return answer;
}

function executeEquation(num1, opr, num2) {
  if (isNaN(num1) || isNaN(num2)) return badExpression;

  Decimal.set({ precision: 9, rounding: 5 });

  const x = new Decimal(num1);
  const y = new Decimal(num2);
  let result;

  try {
    switch (opr) {
      case '+':
        result = x.plus(y);
        break;
      case '-':
        result = x.minus(y);
        break;
      case 'x':
        result = x.times(y);
        break;
      case '*':
        result = x.times(y);
        break;
      case '*':
        result = x.times(y);
        break;
      case '/':
        result = x.dividedBy(y);
    }
  } catch (e) {
    console.error(e.message);
  }
  return result.isFinite() ? Number(result) : badExpression;
}

module.exports = {
  executeEquation,
  processEquation,
};
