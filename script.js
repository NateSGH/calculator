const displayText = document.getElementById("display-text");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");

let inputNum = "";
let operator = "";
let number = 0;

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    inputNum += digitBtn.textContent;
    if (operator !== "") {
      displayText.textContent = `${number} ${operator} ${inputNum}`;
    } else displayText.textContent = inputNum;
  });
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    let currentOperator = operator;
    operator = operatorBtn.textContent;
    if (currentOperator === "") {
      number = Number(inputNum);
      inputNum = "";
    }
    displayText.textContent = `${number} ${operator}`;
  });
});

clearBtn.addEventListener("click", () => {
  displayText.textContent = "";
  inputNum = "";
  operator = "";
  number = 0;
});

equalsBtn.addEventListener("click", () => {
  if (inputNum !== "" && operator !== "" && inputNum !== 0) {
    let secondNum = Number(inputNum);
    operate(operator, number, secondNum);
    inputNum = "";
    operator = "";
    number = 0;
  }
});

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, numA, numB) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(numA, numB);
      break;
    case "-":
      result = substract(numA, numB);
      break;
    case "×":
      result = multiply(numA, numB);
      break;
    case "÷":
      result = divide(numA, numB);
      break;
    default:
      break;
  }
  displayText.textContent = result;
}
