let loan = 0
let balanceFromStart = 200 + ' ' + 'kr'

let balance = document.getElementById('balance')
balance.innerHTML = balanceFromStart

console.log(loan)
console.log(balance)

function getALoan() {
   loan = prompt('Fill in the amount you want to have?')
   console.log(loan)
   balance.innerHTML = loan + ' ' + 'kr'
}



