let op = undefined;
let storeData = undefined;
let display_buffer = "";
let input_buffer = "";

function display(s) {
  const scr = document.querySelector(".screen");
  scr.textContent = s;
}

function atomCalc(op, a, b) {
  let ans = 0;
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return "operand must be number";
  }
  if (op == "+") {
    ans = a + b;
  } else if (op == "-") {
    ans = a - b;
  } else if (op == "x") {
    ans = a * b;
  } else if (op == "/") {
    if (b == 0) {
      ans = "zero divide error";
    } else {
      ans = a / b;
    }
  } else if (op == "%") {
    if (b == 0) {
      ans = "zero mod error";
    } else {
      ans = a % b;
    }
  } else {
    ans = "op unsupported";
  }
  return ans;
}

function calculateResult() {
  if (!op) {
    if (input_buffer != undefined) {
      if (Number.isNaN(Number(input_buffer))) {
        allClear();
        display_buffer = "invalid input";
        display(display_buffer);
        return;
      }

      display_buffer = input_buffer;
      storeData = input_buffer;
      display(display_buffer);
    } else {
      display(storeData);
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
  input_buffer = "";
  display_buffer = "";
}

function allClear() {
  op = undefined;
  input_buffer = "";
  display_buffer = "";
  storeData = undefined;
  display(display_buffer);
}

function input_buffer_append(c) {
  if (input_buffer == "0") {
    input_buffer = c;
  } else {
    input_buffer += c;
  }
}

function input_buffer_pop() {
  if (input_buffer) {
    input_buffer = input_buffer.slice(0, -1);
  }
}

function is_valid_float(f) {}
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
      if (storeData == NaN) {
        clear();
        display_buffer = "invalid input";
        display(display_buffer);
        return;
      }
      input_buffer = "";
      display_buffer = input_buffer;
      display(display_buffer);
      const sym = btn.textContent;
      op = sym;
    } else if (op && input_buffer) {
      if (storeData == NaN) {
        allClear();
        display_buffer = "invalid input";
        display(display_buffer);
        return;
      }

      calculateResult();
      const sym = btn.textContent;
      op = sym;
    } else if (input_buffer == "") {
      input_buffer = "";
      display_buffer = "";
      display(display_buffer);

      const sym = btn.textContent;
      op = sym;
    } else {
      storeData = Number(input_buffer);
      if (storeData == NaN) {
        allClear();
        display_buffer = "invalid input";
        display(display_buffer);
        return;
      }

      input_buffer = "";
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

// delete
const del_btn = document.querySelector("#delete");
del_btn.addEventListener("click", () => {
  input_buffer_pop();
  display_buffer = input_buffer;
  display(display_buffer);
});

// all clear
const AC_btn = document.querySelector("#allClear");
AC_btn.addEventListener("click", () => {
  allClear();
});
