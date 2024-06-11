// operator functions

function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second
}

function multiply(first, second) {
    normal = Math.round((first*second) * 1000000) / 1000000;
    if (normal > 0) {
        return normal
    }
    return (first*second).toPrecision(3);
}

function divide(first, second) {
    if (second == 0) {
        return "Infinity? Nah, I'd win"
    }
    normal = Math.round((first/second) * 1000000) / 1000000;
    if (normal > 0) {
        return normal
    }
    return (first/second).toPrecision(3);
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

// main code for the calculator

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
let displayContent = "",
    result = "",
    operatorAvailability = true,
    decimalAvailability = true;

// a few shared functions for adding numbers, operators, and using the decimal point, equal and clear buttons

function addNum(num) {
    displayContent += num;
    display.textContent = displayContent;
}

function addOperator(operator) {
    if (displayContent == "") { //after using the equals button/equate() function
        if (operator == "-") {
            displayContent += "-";
        } else {
            displayContent += `${result} ${operator} `;
            operatorAvailability = false;
        }
    } else if (displayContent.slice(-1) == " ") { //successively pressing operators swaps the current for the new one
        if (operator == "-") {
            displayContent += "-";
        } else {
            displayContent = displayContent.slice(0, -3) + ` ${operator} `;
            operatorAvailability = false;
        }
    } else if (operatorAvailability == false && (!isNaN(parseFloat(displayContent.slice(-1))) && isFinite(displayContent.slice(-1)))) { //for auto-equating when a second operator is used
        let splitContents = displayContent.split(" ", 3);
        displayContent = operate(splitContents[0], splitContents[1], splitContents[2]);
        result = displayContent
        displayContent += ` ${operator} `;
        operatorAvailability = false;
    } else if (displayContent.slice(-1) != "-") { //for regular adding of operators
        displayContent += ` ${operator} `;
        operatorAvailability = false;
    }
    display.textContent = displayContent;
    decimalAvailability = true;
}

function addDecimal() {
    if (decimalAvailability == true) {
        displayContent += ".";
        display.textContent = displayContent;
        decimalAvailability = false;
    }
}

function equate() {
    let count = 0;
    for (let i = 0; i < displayContent.length; i++) {
        if (displayContent.charAt(i) == " ") {
            count += 1;
        }
    };
    if (count == 2) {
        let splitContents = displayContent.split(" ", 3);
        if ((!isNaN(parseFloat(splitContents[0])) && isFinite(splitContents[0])) && (!isNaN(parseFloat(splitContents[2])) && isFinite(splitContents[2]))) {
            displayContent = operate(splitContents[0], splitContents[1], splitContents[2]);
            display.textContent = displayContent
            result = displayContent
            displayContent = "";
        }
    };
}

function clearAll() {
    displayContent = "";
    display.textContent = "0";
    result = "";
    operatorAvailability = true;
    decimalAvailability = true;
}

// calling the above functions for both UI and keypresses 

display.onkeydown = () => {
    let key = event.key;
    if (!isNaN(key)) {
        addNum(key);
    } else if (key === "+" || key === "-" || key === "/") {
        addOperator(key);
    } else if (key === "x" || key === "*") {
        addOperator("×");
    } else if (key === ".") {
        addDecimal()
    } else if (key === "=" || key === "Enter") {
        equate();
    } else if (key === "Backspace") {
        clearAll();
    }
}

numbers.forEach((number) => number.addEventListener("click", () => {
    addNum(number.textContent);
}));

operators.forEach((operator) => operator.addEventListener("click", () => {
    addOperator(operator.textContent)
}));

decimal.addEventListener("click", () => {
    addDecimal()
});

equal.addEventListener("click", () => {
    equate()
});

clear.addEventListener("click", () => {
    clearAll()
})