let loan = 0;
let balanceValue = 2000;
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
const featuresDescElement = document.getElementById("featuresDesc");
const titleElement = document.getElementById("laptopTitle");
const textElement = document.getElementById("laptopDescription");
const priceElement = document.getElementById("laptopPrice");
const imageContainer = document.getElementById("imgContainer");
let imageElement = document.createElement("img");

const loanBtn = document.getElementById("loanBtn");
const loanBtnDiv = document.getElementById("loanBtnDiv");
const repayLoanBtn = document.getElementById("repayLoanBtn");
const bankBtn = document.getElementById("bankBtn");
const workBtn = document.getElementById("workBtn");
const buyBtn = document.getElementById("buyBtn");

balance.innerText = formatCurrency(balanceValue);
salaryToShow.innerText = formatCurrency(salary);
loanToPay.innerText = formatCurrency(loan);

loanDiv.style.display = "none";
repayLoanDiv.style.display = "none";

loanBtn.addEventListener("click", function () {
  getLoan();
  checkIfLoan();
});

repayLoanBtn.addEventListener("click", function () {
  repayLoan();
  checkIfLoan();
});

bankBtn.addEventListener("click", function () {
  transferMoneyToBalance();
  checkIfLoan();
});

workBtn.addEventListener("click", function () {
  getSalaryFromWork();
});

function formatCurrency(num) {
  return new Intl.NumberFormat().format(num);
}

function getLoan() {
  loan = prompt("Fill in the amount you want to have?");
  if (loan === "") {
    // user pressed OK, but the input field was empty
    loanDiv.style.display = "none";
    repayLoanDiv.style.display = "none";
    loanBtnDiv.style.display = "flex";
  } else if (loan) {
    // user typed something and hit OK
    if (hasLoan === false && loan < balanceValue) {
      balanceValue = Number(balanceValue) + Number(loan);
      balance.innerText = formatCurrency(balanceValue);
      hasLoan = true;
      loanToPay.innerText = formatCurrency(loan);
      loanDiv.style.display = "flex";
      repayLoanDiv.style.display = "flex";
      loanBtnDiv.style.display = "none";
    } else if (hasLoan === true) {
      alert("You already have a loan");
    } else if (loan >= balanceValue) {
      alert("you cant borrow more money than you have");
    }
  } else {
    // user hit cancel
    loanDiv.style.display = "none";
    repayLoanDiv.style.display = "none";
    loanBtnDiv.style.display = "flex";
  }
}

function repayLoan() {
  let loanToRemove = loan;

  console.log(salary, "sal utanför");
  console.log(balanceValue, "bal utanför");
  console.log(loan, "loan utanför");
  if (salary === 0) {
    alert("Go to work and earn some money first");
  }
  if (salary >= loan) {
    console.log("if", loan);
    console.log(balanceValue, "balance");
    console.log(salary, "sal");
    let moneyToAdd = Number(salary) - Number(loan);
    balanceValue = Number(balanceValue) - Number(loan);
    balanceValue = Number(balanceValue) + Number(moneyToAdd);
    salary = 0;
    loanToRemove = 0;
    loanToPay.innerText = formatCurrency(loanToRemove);
    balance.innerText = formatCurrency(balanceValue);
    salaryToShow.innerText = formatCurrency(salary);
    repayLoanDiv.style.display = "none";
    loanBtnDiv.style.display = "flex";
    loan = 0;
  } else if (salary < loan && salary !== 0) {
    console.log("else");
    let moneyToRemove = Number(salary);
    balanceValue = Number(balanceValue) - moneyToRemove;
    loan = Number(loan) - Number(salary);
    salary = Number(salary) - moneyToRemove;
    console.log(salary, "sal");
    console.log(loan, "hej");
    loanToPay.innerText = formatCurrency(loan);

    balance.innerText = formatCurrency(balanceValue);

    salaryToShow.innerText = formatCurrency(salary);
  }
}
function checkIfLoan() {
  if (loan === 0) {
    repayLoanDiv.style.display = "none";
    loanBtnDiv.style.display = "flex";
    loanDiv.style.display = "none";
    hasLoan = false;
  }
}

function getSalaryFromWork() {
  salary = Number(salary) + 100;
  salaryToShow.innerText = formatCurrency(salary);
}

function transferMoneyToBalance() {
  console.log(salary, "salary");
  console.log(loan, "loan");
  console.log(balanceValue, "balance");

  if (loan === 0) {
    balanceValue = balanceValue + salary;
    balance.innerText = formatCurrency(balanceValue);

    salary = 0;
    salaryToShow.innerText = formatCurrency(salary);
  } else {
    let moneyToLoan = salary * 0.1;
    loan = Number(loan) - Number(moneyToLoan);

    let moneyToBalance = salary * 0.9;
    balanceValue = Number(balanceValue) + Number(moneyToBalance);

    if (loan < 0) {
      loan = loan * -1;
      balanceValue = balanceValue + Number(loan);
      loan = 0;
      console.log("hej", balanceValue);
    }

    salary = 0;
    console.log(loan);
    balance.innerText = formatCurrency(balanceValue);
    loanToPay.innerText = formatCurrency(loan);
    salaryToShow.innerText = formatCurrency(salary);
  }
}

fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToMenu(laptops))
  .catch((error) => {
    console.log("something went wrong", error);
  });

const addLaptopsToMenu = (laptops) => {
  laptops.forEach((x) => addLaptopToMenu(x));
  featuresElement.innerText = laptops[0].specs;
  featuresDescElement.innerText = laptops[0].specs;
  titleElement.innerText = laptops[0].title;
  textElement.innerText = laptops[0].description;
  priceElement.innerText = laptops[0].price;
  imageElement.src = `https://hickory-quilled-actress.glitch.me/${laptops[0].image}`;
  imageContainer.append(imageElement);
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
  featuresDescElement.innerText = selectedLaptop.specs;
  titleElement.innerText = selectedLaptop.title;
  textElement.innerText = selectedLaptop.description;
  priceElement.innerText = formatCurrency(selectedLaptop.price);

  imageElement.src = `https://hickory-quilled-actress.glitch.me/${selectedLaptop.image}`;
  imageContainer.append(imageElement);
  imageElement.onerror = function () {
    imageElement.src = "/images/laptoplogo.png";
  };
};

const handleBuyLaptop = () => {
  const selectedLaptop = laptops[laptopsElement.selectedIndex].price;
  if (balanceValue >= selectedLaptop) {
    alert(
      `You are now a happy owner of an excellent laptop! And I´m gonna steal ${selectedLaptop} SEK from your bank account.`
    );
    balanceValue = Number(balanceValue) - Number(selectedLaptop);
    balance.innerText = formatCurrency(balanceValue);
  } else alert("Hey, you can´t afford that! Go and get some more money!");
};

laptopsElement.addEventListener("change", handleLaptopMenuChange);
buyBtn.addEventListener("click", handleBuyLaptop);
