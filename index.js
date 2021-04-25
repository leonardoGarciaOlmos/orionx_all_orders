"use strict";
require('babel-register')({
    presets : ['react']
})
const Express = require('express');
const React = require('react');
const ReactDomServer = require('react-dom/server')

const AllOrders = require('./view/all_orders.jsx');
// const path = require('path');
const App = Express();
const portListen = 8000;

//App.use(express.static('src')); //<- la carpeta 'public' debe estar en el directorio raíz de la aplicación (el directorio que contiene a index.js)

App.get('/all_orders', (req, res, next) => { //como buena práctica siempre incluye el objeto 'next'
    
    let html = ReactDomServer.renderToString(
        React.createElement(AllOrders)
    )
    
    res.send(html);
    // console.log(req.url);
    // res.sendFile(path.join(__dirname+'/index.html'));
    // const orders = require("./data/orders_leo.json");
    // console.log(orders)
});

App.listen(portListen, () => {
    console.log(`Servidor escuchando en puerto ${portListen}`);
});