let op = undefined;
let storeData = undefined;
let display_buffer = "";
let input_buffer = "";

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
  } else if (op == "x") {
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
    if (storeData) {
      display_buffer = storeData;
      display(display_buffer);
    } else {
      return "no input";
    }
  } else {
    if (!input_buffer) {
      return;
    } else {
      storeData = atomCalc(op, storeData, Number(input_buffer));
      input_buffer = "";
      display_buffer = storeData;
      display(display_buffer);
    }
  }
}

function clear() {
  op = undefined;
  display_buffer = "";
}

function allClear() {
  op = undefined;
  display_buffer = "";
  storeData = undefined;
}

function input_buffer_append(c) {
  if (input_buffer == "0") {
    input_buffer = c;
  } else {
    input_buffer += c;
  }
}

// op
const top_operator_btns = document.querySelectorAll(".top-operators button");
const operator_btns = Array.from(top_operator_btns);
const add_btn = document.querySelector("#add");
operator_btns.push(add_btn);
operator_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (storeData === undefined) {
      // TODO debug main logic
      storeData = Number(input_buffer); // TODO buffer format error handling
      input_buffer = "";
      display_buffer = input_buffer;
      display(display_buffer);
      const sym = btn.textContent;
      op = sym;
    } else if (op && input_buffer) {
      calculateResult();
      const sym = btn.textContent;
      op = sym;
    } else {
      display_buffer = "";
      display(display_buffer);

      const sym = btn.textContent;
      op = sym;
    }
  });
});

// operand
// all input will go to buffer
// buffer can be converted to operands, operator
const number_btns = document.querySelectorAll(".numbers button");

number_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sym = btn.textContent;
    input_buffer_append(sym);
    display_buffer = input_buffer;
    display(display_buffer);
  });
});

// calculate
const equal_btn = document.querySelector("#equal");
equal_btn.addEventListener("click", () => {
  calculateResult();
  clear();
});
