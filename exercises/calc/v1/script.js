let displayLarge = document.querySelector('#display-large');
let displaySmall = document.querySelector('#display-small');
let msgBox = document.querySelector('#message-box');

let btnBkspace = document.querySelector('#btn-backspace');
let btnClr = document.querySelector('#btn-clear');
let equals = document.querySelector('#btn-equals');
let oprKeys = document.querySelectorAll('.key-operator');
let digits = document.querySelectorAll('.key-number');

function addListeners() {
  btnBkspace.addEventListener('click', backspace);
  btnClr.addEventListener('click', clear);
  digits.forEach((digit) => digit.addEventListener('click', digitClicked));
  oprKeys.forEach((opr) => opr.addEventListener('click', operatorClicked));
  document.addEventListener('keyup', isValidInput);
  // equals.addEventListener('click', equalTo);
}

function backspace() {}

function clear() {
  displaySmall.textContent = '';
  displayLarge.textContent = '0';
}

function isValidInput(e) {
  // Logic1: check if key pressed is a digit/period or an operator or any other key
  // Logic2: if digit/period, fetch the "data-num" data attribute
  // Validation1: if data-opr is fetched, check if queryselector fetched null
  //             then return
  //             else call digit/operator clicked passing the event
  const numberCheck = ['Digit', 'Period'];
  const oprCheck = ['Enter', '/', '-', '+', '*'];
  const dataAttribute = numberCheck.some((el) => e.code.includes(el))
    ? 'num'
    : oprCheck.some((el) => e.key.includes(el))
    ? 'opr'
    : null;
  if (!dataAttribute) return;
  // const keyPressed = document.querySelector(
  //   `button[data-${dataAttribute}="${e.key}"]`
  // );

  // console.log(e.code, e.key);

  dataAttribute === 'num' ? digitClicked(e) : operatorClicked(e);
}

function digitClicked(e) {
  // Logic: if existing string is 0, then replace 0 with digit else append digit to existing display string
  // Validation: only one decimal in a number
  // Validation: if starting new equation, reset displays
  // Validation: total length of number < 10 (incl decimal)
  const digitClicked = e.type === 'click' ? e.target.dataset.num : e.key;

  if (digitClicked === '.' && displayLarge.textContent.includes('.')) return;

  if (displaySmall.textContent.includes('=')) clear();

  if (displayLarge.textContent.length > 10) {
    msgBox.textContent = 'Please enter less than 10 digits.';
    return;
  }

  displayLarge.textContent = Number(displayLarge.textContent)
    ? displayLarge.textContent + digitClicked
    : digitClicked;
}
  
function operatorClicked(e) {
  let oprClicked = e.type === 'click' ? e.target.dataset.opr : e.key;

  oprClicked = oprClicked === 'Enter' ? '=' : oprClicked;

  if (displaySmall.textContent.includes('=')) clear();
  // TODO: if there is a "result" in displayLarge, then move it to displaySmall if an operator is pressed
  displaySmall.textContent += ` ${displayLarge.textContent} ${oprClicked}`;
  displayLarge.textContent = msgBox.textContent = '';

  if (oprClicked === '=') equalTo();
}

function equalTo() {
  const equation = displaySmall.textContent;
  let parsed = parseEq(equation);
  displayLarge.textContent = processEq(parsed);
}

function parseEq(eq) {
  const regex = /([^\s0-9.\s])/g; // capture all operators i.e. everything that is not (digit, decimal or white space)
  return eq
    .split(regex)
    .filter((num) => num.length)
    .map((num) => {
      if (Number(num) == num) return Number(num);
      return num;
    }); // split by regex, remove blank values
}

function processEq(eq) {
  let opr = '';
  return eq.reduce((acc, cur) => {
    // console.log(acc, opr, cur);
    if (typeof cur !== 'number') {
      opr = cur;
    } else {
      acc = execEq(acc, opr, cur);
    }
    return acc;
  });
}

function execEq(num1, opr, num2) {
  const mill = 1000000;
  let result = 0;
  switch (opr) {
    case '+':
      result = (num1 * mill + num2 * mill) / mill;
      break;
    case '-':
      result = (num1 * mill - num2 * mill) / mill;
      break;
    case 'x':
      result = (num1 * mill * num2 * mill) / (mill * mill);
      break;
    case '/':
      result = (num1 * mill) / (num2 * mill) / (mill * mill);
      break;
  }
  return result.toFixed(4);
}

// TODO Precision Digits
function precisionDigits(num) {
  //determine number of digits after the decimal
  // return numberOfPreciseDigits
}

function init() {
  addListeners();
}

init();
