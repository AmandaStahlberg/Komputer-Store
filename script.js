let loan = 0;
let balanceValue = 200;
let hasLoan = false;
let salary = 0;
let laptops = [];

const loanDiv = document.getElementById("loanDiv");
const balance = document.getElementById("balance");
const repayLoanDiv = document.getElementById("repayLoanDiv");
const loanToPay = document.getElementById("loan");
const salaryToShow = document.getElementById("salary");

const laptopsElement = document.getElementById("laptops");
const featuresElement = document.getElementById("features");
const titleElement = document.getElementById("laptopTitle");
const textElement = document.getElementById("laptopDescription");
const priceElement = document.getElementById("laptopPrice");

const loanBtn = document.getElementById("loanBtn");
const loanBtnDiv = document.getElementById("loanBtnDiv");
const repayLoanBtn = document.getElementById("repayLoanBtn");
const bankBtn = document.getElementById("bankBtn");
const workBtn = document.getElementById("workBtn");
const buyBtn = document.getElementById("buyBtn");

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
});

workBtn.addEventListener("click", function () {
  getSalaryFromWork();
});

buyBtn.addEventListener("click", function () {
  buyLaptop();
  console.log("köp knapp");
});

function getLoan() {
  loan = prompt("Fill in the amount you want to have?");

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
    loan = Number(loan) - Number(moneyToLoan);
    loanToPay.innerHTML = loan;

    let moneyToBalance = salary * 0.9;
    balanceValue = Number(balanceValue) + Number(moneyToBalance);
    balance.innerHTML = balanceValue;

    salary = 0;
    salaryToShow.innerHTML = salary;
  }
}

fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToMenu(laptops));

const addLaptopsToMenu = (laptops) => {
  laptops.forEach((x) => addLaptopToMenu(x));
  featuresElement.innerText = laptops[0].specs;
  titleElement.innerText = laptops[0].title;
  textElement.innerText = laptops[0].description;
  priceElement.innerText = laptops[0].price;
};

const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopsElement.appendChild(laptopElement);
};

const handleLaptopMenuChange = (e) => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  featuresElement.innerText = selectedLaptop.specs;
  titleElement.innerText = selectedLaptop.title;
  textElement.innerText = selectedLaptop.description;
  priceElement.innerText = selectedLaptop.price;
};

laptopsElement.addEventListener("change", handleLaptopMenuChange);

function buyLaptop() {}
