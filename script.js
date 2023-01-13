let loan = 0;
let balanceValue = 200;
let hasLoan = false;
let salary = 0;

let balance = document.getElementById("balance");
let loanDiv = document.getElementById("loanDiv");
let repayLoanDiv = document.getElementById("repayLoanDiv");
let loanToPay = document.getElementById("loan");
let salaryToShow = document.getElementById("salary");

let loanBtn = document.getElementById("loanBtn");
let loanBtnDiv = document.getElementById("loanBtnDiv");
let repayLoanBtn = document.getElementById("repayLoanBtn");
let bankBtn = document.getElementById("bankBtn");
let workBtn = document.getElementById("workBtn");

balance.innerText = balanceValue;
salaryToShow.innerHTML = salary;
loanToPay.innerHTML = loan;

loanDiv.style.display = "none";
repayLoanDiv.style.display = "none";

loanBtn.addEventListener("click", function () {
  getLoan();
});

repayLoanBtn.addEventListener("click", function () {
  console.log("repay btn");
});

bankBtn.addEventListener("click", function () {
  transferMoneyToBalance();
  console.log("bankBtn");
  console.log(balanceValue);
  console.log(salary);
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
    repayLoanDiv.style.display = "flex";
    loanBtnDiv.style.display = "none";
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

function transferMoneyToBalance() {
  if (!loan) {
    balanceValue += salary;
    balance.innerHTML = balanceValue;

    salary = 0;
    salaryToShow.innerHTML = salary;
  } else {
    let moneyToLoan = salary * 0.1;
    loan = Number(loan) + Number(moneyToLoan);
    loanToPay.innerHTML = loan;

    let moneyToBalance = salary * 0.9;
    balanceValue = Number(balanceValue) + Number(moneyToBalance);
    balance.innerHTML = balanceValue;

    salary = 0;
    salaryToShow.innerHTML = salary;
  }
}
