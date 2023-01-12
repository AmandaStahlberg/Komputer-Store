let loan = 0;
let balanceFromStart = 200 + " " + "kr";
let hasLoan = false;

let balance = document.getElementById("balance");
let loanBtn = document.getElementById("loanBtn");

balance.innerHTML = balanceFromStart;

console.log(loan);
console.log(balance);

loanBtn.addEventListener("click", function () {
  loan = prompt("Fill in the amount you want to have?");
  if (hasLoan == false) {
    balance.innerHTML = loan + " " + "kr";
    hasLoan = true;
  } else {
    alert("You already have a loan");
  }
});
