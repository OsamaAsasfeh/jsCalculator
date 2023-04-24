const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //if current display value is 0 replas it
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}
function addDecimal() {
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

const calculate = {
  "÷": (firstNumber, secondNumer) => firstNumber / secondNumer,
  "+": (firstNumber, secondNumer) => firstNumber + secondNumer,
  "-": (firstNumber, secondNumer) => firstNumber - secondNumer,
  "×": (firstNumber, secondNumer) => firstNumber * secondNumer,
  "=": (firstNumber, secondNumer) => secondNumer,
};
function useOperatro(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //Assign firstValue if no Value
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculaion = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculaion;
    firstValue = calculaion;
  }
  //next value
  awaitingNextValue = true;
  operatorValue = operator;
}
// Add event listeners for numbers operators decimal buttons

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operatro")) {
    inputBtn.addEventListener("click", () => useOperatro(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Rest display

function restAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}
clearBtn.addEventListener("click", restAll);
