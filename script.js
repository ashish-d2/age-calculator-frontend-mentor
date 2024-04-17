"use strict";
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const submitBtn = document.querySelector("button");
const displayYear = document.querySelector("#display-year");
const displayMonth = document.querySelector("#display-month");
const displayDay = document.querySelector("#display-day");
const formInput = document.querySelector(".form-inputs").children;

// global value
// current date
const date = new Date();
const currDate = date.getDate();
const currMonth = date.getMonth() + 1;
const currYear = date.getFullYear();

// user inputed date
let dd = 0;
let mm = 0;
let yy = 0;
let errorStatusDay = false;
let errorStatusMonth = false;
let errorStatusYear = false;
let validDate = false;

// used for displaying error message and style
// num is 0 based
// 0 = day, 1 = month, 2 = year
const updateInputField = function (
  num,
  textContent = "This field is required",
  setting
) {
  if (setting === "reset") {
    // update label
    formInput[num].children[0].classList.remove("error-label");

    // update input border
    formInput[num].children[1].classList.remove("error-input");

    // display message
    formInput[num].children[2].style.visibility = "hidden";
    formInput[num].children[2].textContent = "";

    return;
  }

  // update label
  formInput[num].children[0].classList.add("error-label");

  // update input border
  formInput[num].children[1].classList.add("error-input");

  // display message
  formInput[num].children[2].style.visibility = "visible";
  formInput[num].children[2].textContent = textContent;
};

const validDay = function (d) {
  let valid = true;

  // input field is empty
  if (d === 0) {
    errorStatusDay = true;
    updateInputField(0);
    return !valid;
  }

  // not valid input day
  if (d <= 0 || d >= 32) {
    errorStatusDay = true;
    updateInputField(0, "Must be a valid day");
    return !valid;
  }

  // if day is valid -> remove previous error message and style
  if (errorStatusDay === true) {
    errorStatusDay = false;
    updateInputField(0, "", "reset");
  }

  return valid;
};

const validMonth = function (m) {
  let valid = true;

  // input field is empty
  if (m === 0) {
    errorStatusMonth = true;
    updateInputField(1);
    return !valid;
  }

  // not valid input month
  if (m <= 0 || m >= 13) {
    errorStatusMonth = true;
    updateInputField(1, "Must be a valid month");
    return !valid;
  }

  // if month is valid -> remove previous error message and style
  if (errorStatusMonth === true) {
    errorStatusMonth = false;
    updateInputField(1, "", "reset");
  }

  return valid;
};

const validYear = function (y) {
  let valid = true;

  // input field is empty
  if (y === 0) {
    errorStatusYear = true;
    updateInputField(2);
    return !valid;
  }

  // not valid input year
  if (y >= currYear + 1) {
    errorStatusYear = true;
    updateInputField(2, "Must be in the past");
    return !valid;
  }

  // if year is valid -> remove previous error message and style
  if (errorStatusYear === true) {
    errorStatusYear = false;
    updateInputField(2, "", "reset");
  }

  return valid;
};

const validInput = function (d, m, y) {
  let valid = true;

  // Checking validity = empty / valid day, month, year;
  valid = validDay(d);
  valid = validMonth(m);
  valid = validYear(y);

  return valid;
};

const dateIsValid = function (d, m, y) {
  let valid = true;
  const userDate = new Date(y, m - 1, d);

  // if the date is in past
  if (userDate > date) {
    validDate = false;
    updateInputField(0, "Date must be in past");
    updateInputField(1, "");
    updateInputField(2, "");
    return !valid;
  }

  // apprantly this works
  // please study this
  // because mind is dead at this point. (some how this works)
  let a =
    !isNaN(userDate) &&
    userDate.getDate() === d &&
    userDate.getMonth() === m - 1 &&
    userDate.getFullYear() === y;

  if (!a) {
    validDate = false;
    updateInputField(0, "Must be a valid date");
    updateInputField(1, "");
    updateInputField(2, "");
    return !valid;
  }

  // if date is valid but it is marked as invalid in that case reset error message and style
  if (!validDate) {
    validDate = true;
    updateInputField(0, "", "reset");
    updateInputField(1, "", "reset");
    updateInputField(2, "", "reset");
  }

  return valid;
};

submitBtn.addEventListener("click", function (event) {
  dd = Number(day.value);
  mm = Number(month.value);
  yy = Number(year.value);

  if (!validInput(dd, mm, yy)) {
    return;
  }

  if (!dateIsValid(dd, mm, yy)) {
    return;
  }

  let age = date - new Date(yy, mm - 1, dd);

  let yearValue = 1000 * 60 * 60 * 24 * 365.25;
  yy = Math.floor(age / yearValue);
  age -= yy * yearValue;

  let monthValue = 1000 * 60 * 60 * 24 * 30.44;
  mm = Math.floor(age / monthValue);
  age -= mm * monthValue;

  let dayValue = 1000 * 60 * 60 * 24;
  dd = Math.floor(age / dayValue);

  displayYear.textContent = yy;
  displayMonth.textContent = mm;
  displayDay.textContent = dd;
});
