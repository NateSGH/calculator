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
}
// TODO: finish
// bkspBtn.addEventListener("click", () => {
//   displayText.textContent = displayText.textContent.slice(0, -1);
// });

pointBtn.addEventListener("click", () => {
  pointInput();
});

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    numInput(digitBtn.textContent);
  });
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    operatorInput(operatorBtn.textContent);
  });
});

clearBtn.addEventListener("click", () => {
  displayText.textContent = "";
  resetAllVals();
});

equalsBtn.addEventListener("click", () => {
  equals();
});

function pointInput() {
  if (inputNum !== "" && !inputNum.includes(".")) {
    inputNum += ".";

    if (operator !== "") {
      displayText.textContent = `${number} ${operator} ${inputNum}`;
    } else displayText.textContent = inputNum;
  }
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

function numInput(digit) {
  inputNum += digit;
  if (inputNum.includes(".")) {
    inputNum = inputNum.slice(0, inputNum.indexOf(".") + 2);
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
}

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
  if (!Number.isInteger(result)) {
    result = Number(result.toFixed(2));
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
    // let operatorFlag = false;
    // let operatorTemp = "";

    // switch (e.key) {
    //   case "+":
    //     operatorFlag = true;
    //     operatorTemp = e.key;
    //     break;
    //   case "-":
    //     operatorFlag = true;
    //     operatorTemp = e.key;
    //     break;
    //   case "/":
    //     operatorFlag = true;
    //     operatorTemp = "÷";
    //     break;
    //   case "*":
    //     operatorFlag = true;
    //     operatorTemp = "×";
    //     break;
    //   case "Enter":
    //     break;
    //   default:
    //     break;
    // }

    // if (operatorFlag) {
    //   operatorInput(operatorTemp);
    //   operatorFlag = false;
    //   // } else if (e.code.includes("NumpadEnter")) {
    //   // equals();
    // } else if (e.key === ".") {
    //   pointInput();
    // } else {
    //   numInput(e.key);
    // }
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
