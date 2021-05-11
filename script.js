const displayText = document.getElementById("display-text");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const bkspBtn = document.querySelector(".backspace");
const equalsBtn = document.querySelector(".equals");
const pointBtn = document.querySelector(".point");

let inputNum = "";
let operator = "";
let number = 0;

function resetAllVals() {
  inputNum = "";
  operator = "";
  number = 0;
  pointBtn.disabled = false;
}

bkspBtn.addEventListener("click", () => {
  // displayText.textContent = displayText.textContent.slice(0, -1);
});

pointBtn.addEventListener("click", () => {
  pointInput();
  console.log("point");
});

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    numInput(digitBtn.textContent);
    digitBtn.blur();
  });
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    operatorInput(operatorBtn.textContent);
    operatorBtn.blur();
  });
});

clearBtn.addEventListener("click", () => {
  console.log("Clear");
  displayText.textContent = "0";
  resetAllVals();
  clearBtn.blur();
});

equalsBtn.addEventListener("click", () => {
  equals();
  equalsBtn.blur();
});

function numInput(digit) {
  // after equals to dial a new number
  if (operator === "" && number) {
    resetAllVals();
  }

  inputNum += digit;
  // remove zeros in the beginning of num
  if (
    inputNum.length > 1 &&
    inputNum.charAt(0) === "0" &&
    inputNum.charAt(1) !== "."
  ) {
    inputNum = inputNum.slice(1);
  }

  if (operator !== "") {
    displayText.textContent = `${number} ${operator} ${inputNum}`;
  } else displayText.textContent = inputNum;
}

function operatorInput(operatorVal) {
  if (!number) {
    // start
    number = Number(inputNum);
    inputNum = "";
    operator = operatorVal;
    displayText.textContent = `${number} ${operator}`;
  } else if (inputNum !== "") {
    // second and other operators
    let secondNum = Number(inputNum);
    secondNum = operate(operator, number, secondNum);
    resetAllVals();
    operator = operatorVal;
    number = secondNum;
    displayText.textContent = `${number} ${operator}`;
  } else {
    // after "equals" pressed
    operator = operatorVal;
    displayText.textContent = `${number} ${operator}`;
  }
  pointBtn.disabled = false;
}

function pointInput() {
  // if (inputNum !== "" && !inputNum.includes("."))
  if (inputNum == "" && !inputNum.includes(".")) {
    // after equals to dial a new number
    if (operator === "" && number) {
      resetAllVals();
    }
    inputNum += "0.";
  } else if (!inputNum.includes(".")) inputNum += ".";
  pointBtn.disabled = true;
  if (operator !== "") {
    displayText.textContent = `${number} ${operator} ${inputNum}`;
  } else displayText.textContent = inputNum;
}

function equals() {
  console.log(`${number} ${operator} ${inputNum}`);
  if (inputNum !== "" && operator !== "" && inputNum !== 0) {
    let secondNum = Number(inputNum);
    secondNum = operate(operator, number, secondNum);
    resetAllVals();
    number = secondNum;
    return number;
  }
}

function backspace() {}

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
  if (b === 0) {
    return "Error. Division by zero";
  }
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
  //  round answers with long decimals so that they don’t overflow the screen
  if (!Number.isInteger(result)) {
    let str = result.toString();
    if (str.slice(str.indexOf(".") + 1).length >= 20) {
      result = Number(result.toFixed(22));
    }
  }
  console.log(`Operate Result - ${result} type ${typeof result}`);
  displayText.textContent = result;
  console.log(`displayText - ${displayText.textContent}`);
  // displayText.textContent += "Test";
  return result;
}

// Keyboard
window.addEventListener("keydown", (e) => {
  let operatorFlag = false;
  let operatorTemp = "";

  if (e.code.includes("Digit") && e.code.slice(-1) === e.key) {
    numInput(e.key);
  } else if (e.key === "Enter") {
    console.log(`Enter pressed - ${equals()}`);
    // equals();
  } else if (
    e.code.includes("Numpad") &&
    !Number.isNaN(Number(e.code.slice(-1)))
  ) {
    numInput(e.key);
  } else if (e.key === ".") {
    pointInput();
  } else {
    switch (e.key) {
      case "+":
        operatorFlag = true;
        operatorTemp = e.key;
        break;
      case "-":
        operatorFlag = true;
        operatorTemp = e.key;
        break;
      case "/":
        operatorFlag = true;
        operatorTemp = "÷";
        break;
      case "*":
        console.log(e);
        operatorFlag = true;
        operatorTemp = "×";
        break;
      default:
        break;
    }

    if (operatorFlag) {
      operatorInput(operatorTemp);
      operatorFlag = false;
    }
  }
});
