"use strict";
function loadIpc(td, date) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let ipc = JSON.parse(this.responseText);
            td.innerHTML = ipc.serie[0].valor;
        }
    };
    xhttp.open("GET", "https://mindicador.cl/api/ipc/" + date, true);
    xhttp.send();
}
document.addEventListener("DOMContentLoaded", function (event) {
    //we ready baby
});
var orders = JSON.parse(ordersStr);
var report = document.getElementById("orders");
var transactionOrders = orders.data.transactions.items.filter(function (e) {
    //  (e.type == "trade-in" ||  e.type == "trade-out") 
    return e.market != null && e.market.code == 'BTCCLP';
});

transactionOrders.forEach(function (order) {
    var row = document.createElement("tr");
    var date = document.createElement("td");
    var currencyPair = document.createElement("td");
    var type = document.createElement("td");
    var amountClp = document.createElement("td");
    var txCurrency = document.createElement("td");
    var currencyAmount = document.createElement("td");
    var ipc = document.createElement("td");
    var commissionCrypto = document.createElement("td");
    var commissionClp = document.createElement("td");
    var cryptoBalance = document.createElement("td");
    var ipc = document.createElement("td");

    row.appendChild(date);
    row.appendChild(currencyPair);
    row.appendChild(type);
    row.appendChild(amountClp);
    row.appendChild(txCurrency);
    row.appendChild(currencyAmount);
    row.appendChild(commissionCrypto);
    row.appendChild(commissionClp);
    row.appendChild(cryptoBalance);
    row.appendChild(ipc);

    var commissionCrytoIn = ((order.cost / order.price) - (order.amount / 100000000)).toFixed(8);
    var commissionCrytoOut = Math.round(((order.amount / 100000000) * order.price) - order.cost);
    date.innerHTML = moment(new Date(order.date)).format('DD/MM/YYYY');
    currencyPair.innerHTML = order.market.code;
    type.innerHTML = order.type;
    amountClp.innerHTML = order.cost;
    txCurrency.innerHTML = order.amount / 100000000;
    currencyAmount.innerHTML = order.price;
    commissionCrypto.innerHTML = (order.type == "trade-in") ? commissionCrytoIn : 0;
    commissionClp.innerHTML = (order.type == "trade-out") ? commissionCrytoOut : 0;
    cryptoBalance.innerHTML = order.balance / 100000000;
    loadIpc(ipc, moment(new Date(order.date)).format('DD-MM-YYYY'));
    
    report.appendChild(row);
});
