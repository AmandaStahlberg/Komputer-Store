let loan = 0;
let balanceValue = 200;
let hasLoan = false;
let salary = 0;

let balance = document.getElementById("balance");
let loanDiv = document.getElementById("loanDiv");
let loanToPay = document.getElementById("loan");
let salaryToShow = document.getElementById("salary");

let loanBtn = document.getElementById("loanBtn");
let bankBtn = document.getElementById("bankBtn");
let workBtn = document.getElementById("workBtn");

balance.innerText = balanceValue;
salaryToShow.innerHTML = salary;
loanToPay.innerHTML = loan;

loanDiv.style.display = "none";

loanBtn.addEventListener("click", function () {
  getLoan();
});

bankBtn.addEventListener("click", function () {
  console.log("bankBtn");
});

workBtn.addEventListener("click", function () {
  getSalaryFromWork();
});

function getLoan() {
  loan = prompt("Fill in the amount you want to have?");
  console.log(loan);
  console.log(balanceValue);
  if (hasLoan == false && loan < balanceValue) {
    balance.innerHTML = Number(loan) + Number(balanceValue);
    balanceValue = loan;
    hasLoan = true;
    loanToPay.innerHTML = loan;
    loanDiv.style.display = "flex";
  } else if (hasLoan == true) {
    alert("You already have a loan");
  } else if (loan >= balanceValue) {
    alert("you cant borrow more money than you have");
  }
}

function getSalaryFromWork() {
  salary = Number(salary) + 100;
  salaryToShow.innerHTML = salary;
}
