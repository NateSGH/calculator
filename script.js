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
  switch (operator) {
    case "+":
      add(numA, numB);
      break;
    case "-":
      substract(numA, numB);
      break;
    case "*":
      multiply(numA, numB);
      break;
    case ":":
      divide(numA, numB);
      break;
    default:
      break;
  }
}
