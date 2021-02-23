# Test cases

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
    6. When I enter an invalid operation, show the message "Bad Expression"
       1. 9/0= Bad Expression
       2. 0/0= Bad Expression
       3.
    7.

# Flow

    1. On page load, reset everything through *AllClear*
    2. User enters a number and then an operator followed by another number.
    3.

# Validations

<!-- TODO  -->

    1. An operator must have 2 numbers except if it is a unary operator (+ or -) then it should have one number following the operator.
    2. When I press =/result key, display the answer in dispLarge and the entire equation on dispSmall.
       - When I press any other number, start a new equation by calling *AllClear* and then display number being entered.
    3. For all exceptions, set dispLarge to "Bad Expression" and dispSmall to show the bad expression/equation.
    4. Only one decimal in a number.
    5. Only one equal to in an equation

<!-- TO DONE -->

# Functions

    1. init
    2. addListeners
    3.
    4. allClear
    5. clear
    6.
