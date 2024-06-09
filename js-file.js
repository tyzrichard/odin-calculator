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
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (operator == "+") {
        return add(num1, num2);
    } else if (operator == "-") {
        return subtract(num1, num2)
    } else if (operator == "×") {
        return multiply(num1, num2)
    } else {
        return divide(num1, num2)
    }
}

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equals");
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
let displayContent = "",
    result = "",
    operatorAvailability = true;

numbers.forEach((number) => number.addEventListener("click", () => {
    displayContent += number.textContent;
    display.textContent = displayContent;
}));

operators.forEach((operator) => operator.addEventListener("click", () => {
    if (displayContent == "") {
        displayContent += `${result} ${operator.textContent} `;
    } else if (displayContent.slice(-1) == " ") {
        displayContent = displayContent.slice(0, -3) + ` ${operator.textContent} `;
    } else if (operatorAvailability == false) {
        let splitContents = displayContent.split(" ", 3);
        displayContent = operate(splitContents[0], splitContents[1], splitContents[2]);
        display.textContent = displayContent
        result = displayContent
        displayContent = "";
        displayContent += ` ${operator.textContent} `;
    } else {
        displayContent += ` ${operator.textContent} `;
    }
    display.textContent = displayContent;
    operatorAvailability = false;
}));

equal.addEventListener("click", () => {
    let count = 0;
    for (let i = 0; i < displayContent.length; i++) {
        if (displayContent.charAt(i) == " ") {
            count += 1;
        }
    }
    console.log(displayContent[0], displayContent.slice(-1))
    if (count == 2 && (!isNaN(parseFloat(displayContent[0])) && isFinite(displayContent[0])) && (!isNaN(parseFloat(displayContent.slice(-1))) && isFinite(displayContent.slice(-1)))) {
        let splitContents = displayContent.split(" ", 3);
        displayContent = operate(splitContents[0], splitContents[1], splitContents[2]);
        display.textContent = displayContent
        result = displayContent
        displayContent = "";
    }
});

clear.addEventListener("click", () => {
    displayContent = "";
    display.textContent = "0";
    result = "";
    operatorAvailability = true;
})