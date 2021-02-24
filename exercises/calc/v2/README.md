# Basic Calculator

- Assignment from The Odin Project
- Front-end design from [BigsonDev](https://bigsondev.com/projects/calculator-app-project/)

## Test cases

    1. I can either click or type the equation.
       1. I should be able to enter **numbers**, **decimal** and **operators** (+,-,*,/) to create the equation
       2. When I press (**Enter** key or **=**), I should get the result of the equation
       3. When I press the **Backspace** key or **C**, the last character entered should be deleted.
       4. When I press the **Esc** key or **AC**, the calculator should reset.
       5. No other keys are allowed
    2. An equation should always start with either a number or a negative unary operator.
    3. There can be only one decimal point in a number.
    4. There can be only one result operation of an equation. Result is calculated when I press = or *Enter* key
    5. When I enter two numbers with an operator, I should get the appropriate result
       1. 2+5=7
       2. 5-1=4
       3. 4*5=20
       4. 9/3=3
<<<<<<< HEAD
    6. When I enter an invalid operation, show the message "Bad Expression"
       1. 9/0= Bad Expression
       2. 0/0= Bad Expression
    7. When I enter a number with a percentage symbol, the following logic is used:
=======
    6. When I enter a number with a percentage symbol, the following logic is used:
>>>>>>> fd2dbfed606fa057475f843be00e6957ecc014ab
       1. a+b% = a * (1+b/100)
       2. a%+b = (a/100)+b
       3. a%+b%=(a/100)*(1+b/100)
       4. a*b% = a * (b/100)
       5. a%*b = (a/100) * b
       6. a%*b% = (a/100)*(b/100)

## Validations

    1. An operator must have 2 numbers except if it is a unary operator (- or %).
    2. When I press =/result key, display the answer in dispLarge and the entire equation on dispSmall.
    3. Remove leading zeros
    4. Only one decimal in a number.
    5. Only one equal to in an equation.
    6. If a malformed expression or incomplete expression is entered, show error message. e.g:
       1. Stray decimal e.g. "10."
       2. Divide by zero
       3. Operator without 2 numbers

## Concepts Learned/Used

- Regex (capture and substitute)
- Data attributes
- Using external library (decimal.js)
- Closest (DOM manipulation)
- Using inline SVG
- Enabling dark mode
- Using jest to test
- TO LEARN: How to test with UI interactions

## Pending

- PEDMAS/BODMAS rule - Calculator currently evaluates left to right
- Error handling for large numbers
- Switching between Light mode & Dark mode
- Split js file into helper js scripts (import/require statements don't work)
