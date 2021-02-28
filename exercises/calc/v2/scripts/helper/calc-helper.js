// ! -------------------------------------------
// * Helper const  to =  validate => user input
// ! -------------------------------------------

export const isValidInput = (userEvent) => {
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

export const isValidOpr = (opr) => {
  const operators = ['+', '-', 'x', '*', '/'];
  return operators.includes(opr);
};

export const isValidNumber = (num) => {
  const isNumber = /^-?\d*\.?\d+%?$/g;
  return !!num.toString().match(isNumber);
};

export const toggleMinus = () => {
  // toggle minus sign on the number in dispLarge (prefix only)
  // works only in click event - not attached to a keyboard event
  const dispLargeText = dispLarge.textContent;

  if (!isValidNumber(dispLargeText)) return;

  dispLarge.textContent = dispLargeText.includes('-')
    ? dispLargeText.replace(/-/, '')
    : '-' + dispLargeText;
};

export const togglePercent = () => {
  // toggle minus sign on the number in dispLarge (prefix only)
  // works only in click event - not attached to a keyboard event
  const dispLargeText = dispLarge.textContent;

  if (!isValidNumber(dispLargeText)) return;

  dispLarge.textContent = dispLargeText.includes('%')
    ? dispLargeText.replace(/%/, '')
    : dispLargeText + '%';
};
