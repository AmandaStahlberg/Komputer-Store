let loan = 0;
let balanceValue = 200;
let hasLoan = false;
let moneyToPayValue = 0;

let balance = document.getElementById("balance");
let moneyToPay = document.getElementById("moneyToPay");

let loanBtn = document.getElementById("loanBtn");
let bankBtn = document.getElementById("bankBtn");
let workBtn = document.getElementById("workBtn");

balance.innerText = balanceValue;
moneyToPay.innerHTML = moneyToPayValue;

loanBtn.addEventListener("click", function () {
  getLoan();
});

bankBtn.addEventListener("click", function () {
  console.log("bankBtn");
});

workBtn.addEventListener("click", function () {
  console.log("workBtn");
});

function getLoan() {
  loan = prompt("Fill in the amount you want to have?");
  if (hasLoan == false && loan < balanceValue) {
    balance.innerHTML = loan;
    balanceValue = loan;
    hasLoan = true;
  } else if (hasLoan == true) {
    alert("You already have a loan");
  } else if (loan >= balanceValue) {
    alert("you cant borrow more money than you have");
  }
}
