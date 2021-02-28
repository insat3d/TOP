let Decimal = require('decimal.js');
// import * as Decimal from './decimal';

const badExpression = 'Bad Expression';

const processEquation = (equation) => {
  // processes the equation following the BODMAS rule (DMAS part only).
  // priority of operators is defined in the operators string
  const operators = ['/', '*', 'x', '+', '-'];
  equation = operators.reduce((acc, cur) => reduceEq(acc, cur), equation);
  return equation[0];
};

const reduceEq = (equation, opr) => {
  // reduce equation by traversing left to right
  // for each instance of opr,
  // execute the equation by taking the number preceeding and following the opr
  let index = equation.indexOf(opr);
  while (index > 0) {
    equation.splice(
      index - 1,
      3,
      executeEquation(equation[index - 1], equation[index], equation[index + 1])
    );
    index = equation.indexOf(opr);
  }
  return equation;
};

const percentCheck = (num1, opr, num2) => {
  // if num1 is %, replace as num1/100
  if (num1.toString().includes('%')) {
    num1 = Number(num1.toString().replace('%', '')) / 100;
  }

  // if num2 is %, apply the opr to num2/100
  if (num2.toString().includes('%')) {
    num2 = Number(num2.toString().replace('%', '')) / 100;
    num2 = executeEquation(1, opr, num2);
    opr = 'x';
  }

  return { num1, opr, num2 };
};

// TODO Add exception handling
const executeEquation = (num1, opr, num2) => {
  // check if one of the numbers is a %
  ({ num1, opr, num2 } = percentCheck(num1, opr, num2));

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
    console.error(`Error in Exec Equation: ${e.message}`);
  }
  return result.isFinite() ? Number(result) : badExpression;
};

module.exports = {
  processEquation,
  executeEquation,
};
