let equation = [];
let snackbar;
const badExpression = 'Bad Expression: Click AC to resume';

let dispLarge = document.querySelector('.dispLarge');
let dispSmall = document.querySelector('.dispSmall');

let btnAllClear = document.querySelector('#all-clear');
let btnBackspace = document.querySelector('#backspace');
let btnPlusMinus = document.querySelector('#plus-minus');

let btnNumberOperators = document.querySelectorAll('.btn-numopr');

init();

function init() {
  allClear();
}

// ! -------------------------------------------
// * Set up event listeners to all buttons
// ! -------------------------------------------

function enableButtons() {
  btnAllClear.addEventListener('click', allClear);
  btnBackspace.addEventListener('click', backspace);

  btnNumberOperators.forEach((key) =>
    key.addEventListener('click', isValidInput)
  );
  document.addEventListener('keyup', isValidInput);
  btnPlusMinus.addEventListener('click', toggleMinus);
}

function disableButtons() {
  btnNumberOperators.forEach((key) =>
    key.removeEventListener('click', isValidInput)
  );
  document.removeEventListener('keyup', isValidInput);
  btnPlusMinus.removeEventListener('click', toggleMinus);
}

// ! -------------------------------------------
// * Hanlding All Clear (AC) and Backspace (C) buttons
// ! -------------------------------------------

function allClear() {
  dispLarge.textContent = 0;
  dispSmall.textContent = '';
  equation = [];
  enableButtons();
}

function backspace() {
  let dispLargeText = dispLarge.textContent.slice(0, -1);
  dispLarge.textContent = dispLargeText === '-' ? '' : dispLargeText;
}

// ! -------------------------------------------
// * Helper functions to validate user input
// ! -------------------------------------------

function isValidInput(userEvent) {
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
}

function isValidOpr(opr) {
  const operators = ['+', '-', 'x', '*', '/'];
  return operators.includes(opr);
}

function isValidNumber(num) {
  const isNumber = /^-?\d*\.?\d+%?$/g;
  return !!num.toString().match(isNumber);
}

function toggleMinus() {
  // toggle minus sign on the number in dispLarge (prefix only)
  // works only in click event - not attached to a keyboard event
  const dispLargeText = dispLarge.textContent;

  if (!isValidNumber(dispLargeText)) return;

  dispLarge.textContent = dispLargeText.includes('-')
    ? dispLargeText.replace(/-/, '')
    : '-' + dispLargeText;
}

function togglePercent() {
  // toggle minus sign on the number in dispLarge (prefix only)
  // works only in click event - not attached to a keyboard event
  const dispLargeText = dispLarge.textContent;

  if (!isValidNumber(dispLargeText)) return;

  dispLarge.textContent = dispLargeText.includes('%')
    ? dispLargeText.replace(/%/, '')
    : dispLargeText + '%';
}

// ! -------------------------------------------
// * Functions handling digits and operators
// ! -------------------------------------------

function digitClicked(clickedNum) {
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
}

function oprClicked(clickedOpr) {
  const dispLargeText = dispLarge.textContent;

  // Validation: disable oprClicked till a valid number is entered
  if (!isValidNumber(dispLargeText) && !isValidOpr(dispLargeText)) return;

  if (isValidNumber(dispLargeText)) pushToEquation();

  dispLarge.textContent = clickedOpr;
}

function showResults() {
  if (
    isValidOpr(dispLarge.textContent) ||
    !isValidNumber(dispLarge.textContent)
  ) {
    dispMsgBox('Incomplete/invalid Expression');
    return;
  }

  pushToEquation();
  const result = processEquation();
  if (result === badExpression) {
    dispMsgBox(badExpression);
    disableButtons();
  } else {
    dispLarge.textContent = result;
    equation = [];
  }
}

// ! -------------------------------------------
// * Building and Executing Equation
// ! -------------------------------------------

function pushToEquation() {
  // "Equation" is the equation that gets executed when the user asks for a result
  equation.push(dispLarge.textContent.replace('x', '*'));
  dispSmall.textContent = [...equation].toString().replace(/,/g, '');
  dispLarge.textContent = '';
}

function processEquation() {
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
  Decimal.set({ precision: 7, rounding: 5 });

  const x = new Decimal(num1);
  const y = new Decimal(num2);
  let result;
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

  return result.isFinite() ? Number(result) : badExpression;
}

// ! -------------------------------------------
// * Error message handling
// TODO Handle results that are large numbers
// ! -------------------------------------------
function dispMsgBox(text, duration = 3) {
  // Toast box to pop up messages to the user
  let toast = document.querySelector('#snackbar');
  clearTimeout(snackbar);

  toast.textContent = text;
  toast.className = 'show';

  // After 'duration' seconds, remove the show class from DIV
  snackbar = setTimeout(() => toast.classList.remove('show'), duration * 1000);
}
