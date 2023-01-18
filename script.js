// Create variables and get them a start value
let loan = 0;
let balanceValue = 2000;
let hasLoan = false;
let salary = 0;
let laptops = [];

// Get elements from HTML and put them in variables
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
let listElement = document.getElementById("list");

const loanBtn = document.getElementById("loanBtn");
const loanBtnDiv = document.getElementById("loanBtnDiv");
const repayLoanBtn = document.getElementById("repayLoanBtn");
const bankBtn = document.getElementById("bankBtn");
const workBtn = document.getElementById("workBtn");
const buyBtn = document.getElementById("buyBtn");

// Give elements value to show on page from start
balance.innerText = formatCurrency(balanceValue);
salaryToShow.innerText = formatCurrency(salary);
loanToPay.innerText = formatCurrency(loan);

// Hide div and btn for loan
loanDiv.style.display = "none";
repayLoanDiv.style.display = "none";

// Add click events on btns
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

// Function to format number to right currency format
function formatCurrency(num) {
  return new Intl.NumberFormat().format(num);
}

// Function to get loan btn
// check if i can get loan
// and get a loan if I can
function getLoan() {
  loan = prompt("Fill in the amount you want to have?");
  console.log(loan, "loan");
  console.log(balanceValue, "bal");
  if (loan === "") {
    // user pressed OK, but the input field was empty
    loanDiv.style.display = "none";
    repayLoanDiv.style.display = "none";
    loanBtnDiv.style.display = "flex";
  } else if (loan) {
    // user typed something and hit OK
    if (loan >= balanceValue / 2) {
      console.log(balanceValue);
      alert("You cant loan more than half of the amount of balance you have");
    } else if (hasLoan === false && loan < balanceValue) {
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
      alert("You cant loan more money than you have");
    }
  } else {
    // user hit cancel
    loanDiv.style.display = "none";
    repayLoanDiv.style.display = "none";
    loanBtnDiv.style.display = "flex";
  }
}

// Function to repay loan btn
// check if I have salary to payback loan or not
// if not alert "go to work"
function repayLoan() {
  let loanToRemove = loan;

  if (salary === 0) {
    alert("Go to work and earn some money first");
  }
  if (salary == loan) {
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
  } else if (salary > loan) {
    salary = Number(salary) - Number(loan);
    balanceValue = Number(balanceValue) + Number(salary);
    loan = 0;
    salary = 0;
    loanToPay.innerText = formatCurrency(loan);
    balance.innerText = formatCurrency(balanceValue);
    salaryToShow.innerText = formatCurrency(salary);
  } else if (salary < loan && salary !== 0) {
    let moneyToRemove = Number(salary);
    balanceValue = Number(balanceValue) - moneyToRemove;
    loan = Number(loan) - Number(salary);
    salary = Number(salary) - moneyToRemove;

    loanToPay.innerText = formatCurrency(loan);

    balance.innerText = formatCurrency(balanceValue);

    salaryToShow.innerText = formatCurrency(salary);
  }
}

// Function to hide repay loan btn and loan div if loan === 0
// and make hasLoan false
function checkIfLoan() {
  if (loan === 0) {
    repayLoanDiv.style.display = "none";
    loanBtnDiv.style.display = "flex";
    loanDiv.style.display = "none";
    hasLoan = false;
  }
}

// Function to get money in to salary when WORK btn is clicked
function getSalaryFromWork() {
  salary = Number(salary) + 100;
  salaryToShow.innerText = formatCurrency(salary);
}

// Function to transfer money from salary to balance and loan
// and calculate that 10% is moved to loan (if I have a loan) else transfer it to only balance
// and calculate that 90% is moved to balance (if I have a loan) else transfer all to balance
function transferMoneyToBalance() {
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
    }

    salary = 0;

    balance.innerText = formatCurrency(balanceValue);
    loanToPay.innerText = formatCurrency(loan);
    salaryToShow.innerText = formatCurrency(salary);
  }
}

// Fetch laptops from API
fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToMenu(laptops))
  .catch((error) => {
    console.log("Something went wrong", error);
  });

// Add laptops to show laptops view container in html
const addLaptopsToMenu = (laptops) => {
  laptops.forEach((x) => addLaptopToMenu(x));
  featuresDescElement.innerText = laptops[0].specs;
  titleElement.innerText = laptops[0].title;
  textElement.innerText = laptops[0].description;
  priceElement.innerText = laptops[0].price;
  imageElement.src = `https://hickory-quilled-actress.glitch.me/${laptops[0].image}`;
  imageContainer.appendChild(imageElement);
  createListOfSpecs(laptops[0].specs);
};

// Create element with laptop to select menu
const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopsElement.appendChild(laptopElement);
};

// Handle change when option in select menu is changed
const handleLaptopMenuChange = (e) => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  let arrOfSpecs = selectedLaptop.specs;
  featuresDescElement.innerText = selectedLaptop.specs;
  titleElement.innerText = selectedLaptop.title;
  textElement.innerText = selectedLaptop.description;
  priceElement.innerText = formatCurrency(selectedLaptop.price);
  createListOfSpecs(arrOfSpecs);

  imageElement.onerror = function () {
    imageElement.src = "./images/laptoplogo.png";
  };
  imageElement.src = `https://hickory-quilled-actress.glitch.me/${selectedLaptop.image}`;
  imageContainer.append(imageElement);
};

// Function to create a list element to show the right features of the laptops
function createListOfSpecs(arr) {
  listElement.innerHTML = "";
  arr.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    listElement.appendChild(li);
  });
}

// Function to buy btn
// Check if I have enough money in balance or not
// If not alert 'get more money'
// If get money from balance and alert that "you have but the computer"
const handleBuyLaptop = () => {
  const selectedLaptop = laptops[laptopsElement.selectedIndex].price;
  const selectedLaptopTitle = laptops[laptopsElement.selectedIndex].title;
  if (balanceValue >= selectedLaptop) {
    alert(
      `You are now a happy owner of an ${selectedLaptopTitle}! And I´m gonna steal ${selectedLaptop} SEK from your bank account.`
    );
    balanceValue = Number(balanceValue) - Number(selectedLaptop);
    balance.innerText = formatCurrency(balanceValue);
  } else alert("Hey, you can´t afford that! Go and get some more money!");
};

// Add onChange event on select element
laptopsElement.addEventListener("change", handleLaptopMenuChange);

// Add onclick event on buy btn
buyBtn.addEventListener("click", handleBuyLaptop);
