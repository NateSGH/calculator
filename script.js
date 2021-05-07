const displayText = document.getElementById("display-text");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");

let digit = "";
let operator = "";

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    digit += digitBtn.textContent;
    displayText.textContent = digit;
  });
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    operator = operatorBtn.textContent;
    displayText.textContent += ` ${operator}`;
  });
});

clearBtn.addEventListener("click", () => {
  displayText.textContent = "";
  digit = "";
  operator = "";
});

equalsBtn.addEventListener("click", () => {
  if (digit !== "" && operator !== "") {
    operate(operator, Number(digit), Number(digit));
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
    case "*":
      result = multiply(numA, numB);
      break;
    case ":":
      result = divide(numA, numB);
      break;
    default:
      break;
  }
  displayText.textContent = result;
}
