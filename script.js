let loan = 0;
let balanceValue = 200;
let hasLoan = false;

let balance = document.getElementById("balance");
let loanBtn = document.getElementById("loanBtn");

balance.innerText = balanceValue;

console.log(loan);
console.log(balanceValue);

loanBtn.addEventListener("click", function () {
  getLoan();
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
