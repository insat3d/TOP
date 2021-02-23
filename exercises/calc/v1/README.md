# Functionality

1. When I click the **clear button**, clear both displays and set large display to 0.

2. When I click on the **backspace button**, clear the last character.

   1. Allow backspace only on non-result values. If user has clicked EqualTo/Result button, disable backspace button. (Nice to have)

3. When I click a **digit button**, the digit is added to the display (large).

   1. If the previous entry is not an operator, the digit is appended to the existing number
   2. If the previous entry is an operator, the digit is added as a new number

4. When I click on an **operator button**, the operator is added to the display (large).

   1. If the previous entry is not an operator, the previous digits together form a number.
   2. If the previous entry is an operator, the current operator overwrites the existing operator. (Nice to have)

5.

## Validation Rules

1. Operator Rules -

   1. Decimal: Only one decimal in a number
   2. Divide: Give an error for divide by zero.

2.

# User Experience

# JS Logic

- Add eventlisteners
  - Clear - clear both displays and set large display to 0. = **clear()**
  - Backspace - XXXXXX = **backspace()**
  - Numbers - Append digit to the large display number = **digitClicked()**
