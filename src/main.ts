function loadIpc(td, date) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          td.innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "https://mindicador.cl/api/ipc/" + date , true);
    xhttp.send();
  }
  

  document.addEventListener("DOMContentLoaded", function(event) { 
    //we ready baby
  });

var orders = JSON.parse(ordersStr)

let report = document.getElementById("orders")

let transactionOrders = orders.data.transactions.items.filter((e)=>{
//  (e.type == "trade-in" ||  e.type == "trade-out") 
    return e.market != null  && e.market.code == 'BTCCLP'
})

transactionOrders.forEach(order => {
    let row = document.createElement("tr")

    let date = document.createElement("td")
    let currencyPair = document.createElement("td")
    let type = document.createElement("td")
    let amountClp = document.createElement("td")
    let txCurrency = document.createElement("td")
    let currencyAmount = document.createElement("td")
    let ipc = document.createElement("td")
    let commissionCrypto = document.createElement("td")
    let commissionClp = document.createElement("td")
    let cryptoBalance = document.createElement("td")

    row.appendChild(date)
    row.appendChild(currencyPair)
    row.appendChild(type)
    row.appendChild(amountClp)
    row.appendChild(txCurrency)
    row.appendChild(currencyAmount)
    row.appendChild(commissionCrypto)
    row.appendChild(commissionClp)
    row.appendChild(cryptoBalance)

    let commissionCrytoIn = ((order.cost / order.price) - (order.amount/100000000)).toFixed(8) 
    let commissionCrytoOut = Math.round(((order.amount/100000000) * order.price) - order.cost)

    date.innerHTML = moment(new Date(order.date)).format('DD/MM/YYYY')
    currencyPair.innerHTML = order.market.code
    type.innerHTML = order.type
    amountClp.innerHTML = order.cost
    txCurrency.innerHTML = order.amount/100000000
    currencyAmount.innerHTML = order.price
    commissionCrypto.innerHTML = (order.type == "trade-in")? commissionCrytoIn : 0
    commissionClp.innerHTML = (order.type == "trade-out")? commissionCrytoOut : 0
    cryptoBalance.innerHTML = order.balance / 100000000

    report.appendChild(row)

});
