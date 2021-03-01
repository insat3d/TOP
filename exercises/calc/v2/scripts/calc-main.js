let equation = [];
let snackbar;
const badExpression = 'Bad Expression: Click AC to resume';

let dispLarge = document.querySelector('.dispLarge');
let dispSmall = document.querySelector('.dispSmall');

let btnAllClear = document.querySelector('#all-clear');
let btnBackspace = document.querySelector('#backspace');
let btnPlusMinus = document.querySelector('#plus-minus');

let btnNumberOperators = document.querySelectorAll('.btn-numopr');

// ! -------------------------------------------
// * Helper functions to validate  user input
// ! -------------------------------------------

const isValidOpr = (opr) => {
  const operators = ['+', '-', 'x', '*', '/'];
  return operators.includes(opr);
};

const isValidNumber = (num) => {
  const isNumber = /^-?\d*\.?\d+%?$/g;
  return !!num.toString().match(isNumber);
};

const toggleMinus = () => {
  // toggle minus sign on the number in dispLarge (prefix only)
  // works only in click event - not attached to a keyboard event
  const dispLargeText = dispLarge.textContent;

  if (!isValidNumber(dispLargeText)) return;

  dispLarge.textContent = dispLargeText.includes('-')
    ? dispLargeText.replace(/-/, '')
    : '-' + dispLargeText;
};

const togglePercent = () => {
  // toggle minus sign on the number in dispLarge (prefix only)
  // works only in click event - not attached to a keyboard event
  const dispLargeText = dispLarge.textContent;

  if (!isValidNumber(dispLargeText)) return;

  dispLarge.textContent = dispLargeText.includes('%')
    ? dispLargeText.replace(/%/, '')
    : dispLargeText + '%';
};

// ! -------------------------------------------
// * Building and Executing Equation
// ! -------------------------------------------

const pushToEquation = () => {
  // "Equation" is the equation that gets executed when the user asks for a result
  equation.push(dispLarge.textContent.replace('x', '*'));
  dispSmall.textContent = [...equation].toString().replace(/,/g, '');
  dispLarge.textContent = '';
};

const percentHandling = (num1, opr, num2) => {
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

const executeEquation = (num1, opr, num2) => {
  // check if one of the numbers is a %
  ({ num1, opr, num2 } = percentHandling(num1, opr, num2));

  if (isNaN(num1) || isNaN(num2)) return badExpression;

  Decimal.set({ precision: 8, rounding: 7 });

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
    // result = result.toDecimalPlaces(8, Decimal.ROUND_HALF_CEIL);
  } catch (e) {
    console.error(`Error in Exec Equation: ${e.message}`);
  }
  return result.isFinite() ? Number(result) : badExpression;
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

const processEquation = (equation) => {
  // processes the equation following the BODMAS rule (DMAS part only).
  // priority of operators is defined in the operators string
  const operators = ['/', '*', 'x', '+', '-'];
  equation = operators.reduce((acc, cur) => reduceEq(acc, cur), equation);
  return equation[0];
};

// ! -------------------------------------------
// * Handling digits and operators
// ! -------------------------------------------

const digitClicked = (clickedNum) => {
  let dispLargeText = dispLarge.textContent;

  // Logic: starting new number or adding digits to existing number
  // if new number, push the dispLarge into Equation
  if (isValidOpr(dispLargeText)) {
    pushToEquation();
    dispLargeText = '';
  }

  // Validation: allow only one decimal per number
  if (clickedNum === '.' && dispLargeText.includes('.')) {
    dispMsgBox('Invalid Input: One decimal in a number');
    return;
  }

  // Validation: allow max of 9 digits excluding decimal and minus sign
  if ((dispLargeText.match(/\d/g) || []).length > 8) {
    dispMsgBox('Invalid Input: Enter less than 10 digits');
    return;
  }

  // Validation: toggle % sign
  if (clickedNum === '%') {
    togglePercent();
    return;
  }

  // Validation: remove leading zeros except when starting with a decimal
  const leadingZeros = /^(-?)(0*)(?!\.)/g; // find leading zeros
  const onlyNegativeZero = /^-?0?$/g; // find only a negative (-) or zero (0) or negative zero (-0)
  const prefix =
    dispLargeText.match(onlyNegativeZero) && clickedNum === '.' ? `$10` : `$1`;

  // Validation: check if % sign was part of number
  let suffix = '';
  if (dispLargeText.includes('%')) {
    dispLargeText = dispLargeText.replace('%', '');
    suffix = '%';
  }

  dispLarge.textContent =
    dispLargeText.replace(leadingZeros, prefix) + clickedNum + suffix;
};

const oprClicked = (clickedOpr) => {
  const dispLargeText = dispLarge.textContent;

  // Validation: disable oprClicked till a valid number is entered
  if (!isValidNumber(dispLargeText) && !isValidOpr(dispLargeText)) return;

  if (isValidNumber(dispLargeText)) pushToEquation();

  dispLarge.textContent = clickedOpr;
};

const showResults = () => {
  if (
    isValidOpr(dispLarge.textContent) ||
    !isValidNumber(dispLarge.textContent)
  ) {
    dispMsgBox('Incomplete/invalid Expression');
    return;
  }

  pushToEquation();

  const result = processEquation(equation);
  if (result === badExpression) {
    dispMsgBox(badExpression);
    disableButtons();
  } else if (result.toString().length > 12) {
    dispMsgBox('Result has too many digits (Click AC to resume)');
    disableButtons();
  } else {
    dispLarge.textContent = result;
    equation = [];
  }
};

const isValidInput = (userEvent) => {
  const keyEntered =
    userEvent.type === 'keyup'
      ? userEvent.key
      : Object.values(userEvent.target.closest('div').dataset)[0];

  if (isValidNumber(keyEntered) || keyEntered === '.' || keyEntered === '%') {
    digitClicked(keyEntered);
  } else if (isValidOpr(keyEntered)) {
    oprClicked(keyEntered);
  } else if (keyEntered === '=' || keyEntered === 'Enter') {
    showResults();
  } else if (keyEntered === 'Escape') {
    allClear();
  } else if (keyEntered === 'Backspace') {
    backspace();
  }
};

// ! -------------------------------------------
// * Error message handling
// ! -------------------------------------------
const dispMsgBox = (text, duration = 3) => {
  // Toast box to pop up messages to the user
  let toast = document.querySelector('#snackbar');
  clearTimeout(snackbar);

  toast.textContent = text;
  toast.className = 'show';

  // After 'duration' seconds, remove the show class from DIV
  snackbar = setTimeout(() => toast.classList.remove('show'), duration * 1000);
};

// ! -------------------------------------------
// * Toogle Light mode Dark mode
// ! -------------------------------------------
let btnLightMode = document.querySelector('#light-mode');
let modeSun = document.querySelector('.sun');
let modeMoon = document.querySelector('.moon');

const toggleLightMode = () => {
  modeMoon.classList.toggle('toggleDarkMode');
  modeSun.classList.toggle('toggleDarkMode');
  if (modeSun.classList.toString().includes('toggleDarkMode')) {
    document.documentElement.setAttribute('data-mode', 'dark');
  } else {
    document.documentElement.setAttribute('data-mode', 'light');
  }
};

// ! -------------------------------------------
// * Set up event listeners to all buttons
// ! -------------------------------------------

const enableButtons = () => {
  btnAllClear.addEventListener('click', allClear);
  btnBackspace.addEventListener('click', backspace);

  btnNumberOperators.forEach((key) =>
    key.addEventListener('click', isValidInput)
  );
  document.addEventListener('keyup', isValidInput);
  btnPlusMinus.addEventListener('click', toggleMinus);
  btnLightMode.addEventListener('click', toggleLightMode);
};

const disableButtons = () => {
  btnNumberOperators.forEach((key) =>
    key.removeEventListener('click', isValidInput)
  );
  document.removeEventListener('keyup', isValidInput);
  btnPlusMinus.removeEventListener('click', toggleMinus);
};

// ! -------------------------------------------
// * Hanlding All Clear (AC) and Backspace (C) buttons
// ! -------------------------------------------

const allClear = () => {
  dispLarge.textContent = 0;
  dispSmall.textContent = '';
  equation = [];
  enableButtons();
};

const backspace = () => {
  let dispLargeText = dispLarge.textContent.slice(0, -1);
  dispLarge.textContent = dispLargeText === '-' ? '' : dispLargeText;
};

// ! -------------------------------------------
// * Load calculator logic
// ! -------------------------------------------

const init = () => {
  allClear();
};

init();
