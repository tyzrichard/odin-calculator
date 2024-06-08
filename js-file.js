function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    return first / second;
}

let num1 = null,
    operator = null, 
    num2 = null;

function operate(num1, operator, num2) {
    if (operator == "+") {
        return add(num1, num2);
    } else if (operator == "-") {
        return subtract(num1, num2)
    } else if (operator == "*") {
        return multiply(num1, num2) 
    } else {
        return dividie(num1, num2)
    }
}

const numbers = document.querySelectorAll(".number, .operator");
const display = document.querySelector(".display");
let displayContent = "";

numbers.forEach((number) => number.addEventListener("click", () => {
    displayContent += number.textContent;
    display.textContent = displayContent;
}))
