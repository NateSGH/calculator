const displayText = document.getElementById("display-text");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");

let inputNum = "";
let operator = "";
let number = 0;

function resetAllVals() {
  inputNum = "";
  operator = "";
  number = 0;
}

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
    // let currentOperator = operator;
    if (!number) {
      // start
      number = Number(inputNum);
      inputNum = "";
      operator = operatorBtn.textContent;
      displayText.textContent = `${number} ${operator}`;
    } else if (inputNum !== "") {
      // second and other operators
      let secondNum = Number(inputNum);
      secondNum = operate(operator, number, secondNum);
      resetAllVals();
      operator = operatorBtn.textContent;
      number = secondNum;
      displayText.textContent = `${number} ${operator}`;
    } else {
      // after "equals" pressed
      operator = operatorBtn.textContent;
      displayText.textContent = `${number} ${operator}`;
    }
  });
});

clearBtn.addEventListener("click", () => {
  displayText.textContent = "";
  resetAllVals();
});

equalsBtn.addEventListener("click", () => {
  if (inputNum !== "" && operator !== "" && inputNum !== 0) {
    let secondNum = Number(inputNum);
    secondNum = operate(operator, number, secondNum);
    resetAllVals();
    number = secondNum;
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
  return result;
}
