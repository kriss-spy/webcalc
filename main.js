let ans = undefined;
let op = undefined;
let a = undefined;
let b = undefined;
let buffer = "";

function display(s) {
  const scr = document.querySelector(".screen");
  scr.textContent = s;
}

function atomCalc(op, a, b) {
  if (a != +a || b != b) {
    return "operand must be number";
  }
  if (op == "+") {
    return a + b;
  } else if (op == "-") {
    return a - b;
  } else if (op == "*") {
    return a * b;
  } else if (op == "/") {
    if (b == 0) {
      return "zero divide error";
    } else {
      return a / b;
    }
  } else if (op == "%") {
    if (b == 0) {
      return "zero mod error";
    } else {
      return a % b;
    }
  } else {
    return "op unsupported";
  }
}

function calculateResult() {
  if (!op) {
    if (a) {
      ans = a;
      display(a);
    } else {
      return "no input";
    }
  } else {
    if (!b) {
      return;
    } else {
      ans = atomCalc(op, a, b);
      display(ans);
    }
  }
}

function allClear() {
  ans = undefined;
  op = undefined;
  a = undefined;
  b = undefined;
  buffer = "";
}

function buffer_append(c) {
  if (buffer == "0") {
    buffer = c;
  } else {
    buffer += c;
  }
}

// op

// operand
// all input will go to buffer
// buffer can be converted to operands, operator
const number_btns = document.querySelectorAll(".numbers button");

number_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sym = btn.textContent;
    buffer_append(sym);
    display(buffer);
  });
});

// calculate
const equal_btn = document.querySelector("#equal");
equal_btn.addEventListener("click", calculateResult());
