const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); //set env
var path = require('path');
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

const data = require('./server/accessDropbase');

/* Here users can see a list of their transactions with
username stock, stock price bought, # of shares,
company used to buy. Store fake todays stock to calc 
revenue so we can show profits */
let transactions = [
    {
        "username": "foobar",
        "stock": "AMZN",
        "price_bought": 3175,
        "date_bought": "2020-01-08",
        "shares": 0.5,
        "application": "Bank",
        "transaction": "buy"
    },
    {
        "username": "foobar",
        "stock": "AMZN",
        "price_bought": 3100,
        "date_bought": "2020-01-11",
        "shares": 2,
        "application": "Bank",
        "transaction": "buy"
    },
    {
        "username": "foobar",
        "stock": "MSFT",
        "price_bought": 218,
        "date_bought": "2020-01-11",
        "shares": 2,
        "application": "Bank",
        "transaction": "buy"
    },
    {
        "username": "foobar",
        "stock": "AMZN",
        "price_bought": 3145,
        "date_bought": "2020-01-11",
        "shares": 1,
        "application": "Bank",
        "transaction": "buy"
    },
    {
        "username": "foobar",
        "stock": "NFLX",
        "price_bought": 511,
        "date_bought": "2020-01-13",
        "shares": 2,
        "application": "Bank",
        "transaction": "buy"
    },
    {
        "username": "foobar",
        "stock": "AMZN",
        "price_bought": 3100,
        "date_bought": "2020-01-11",
        "shares": 2,
        "application": "Bank",
        "transaction": "buy"
    },
]

let today_prices = {
        "AMZN": 3200,
        "NVDA": 514.38,
        "AMD": 88.21,
        "FB": 251.36,
        "MSFT": 212.65,
        "GOOGL": 1727.62,
        "NFLX": 497.98
}


/* Functions for when using built version of React scripts. 
   if you want to test production execute <npm run build> then
   execute <node server.js>*/
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

/* Place all get and post paths here: */

/* Base Example for getting data*/
app.get('/stockData', (req, res) => {
    data.getStockData('googl').then(resp => res.send(resp)
    ).catch(err => console.log(err))
});

/* Client specifies the metric in the url */
app.post('/stockReq/:metric', (req, res) => {
    const stockSearch = (req.body).stock
    var metric = req.params.metric
    data.getStockData(stockSearch, metric).then(resp => res.send(resp)
    ).catch(err => console.log(err))
});

/* User adds transaction using form */
app.post('/transaction', (req, res) => {
    let username = "foobar";
    let stock = (req.body).stock;
    let price_bought = (req.body).price_bought;
    let date_bought = (req.body).date_bought;
    let shares = (req.body).shares;
    let application = (req.body).application;
    let transaction = (req.body).transaction;
    transactions.push({
        username: username,
        stock: stock,
        price_bought: price_bought,
        date_bought: date_bought,
        shares: shares,
        application: application,
        transaction: transaction
    })
});

/* Get all transactions */
app.get('/transactions', (req, res) => {
    let trans = data.getTransactions(transactions);
    res.send(trans);
});

/* Get all transactions */
app.get('/transactionsReturns', (req, res) => {
    data.getTransactionReturns(transactions).then(resp => res.send(resp)
    ).catch(err => console.log(err))
});

/* Get all transaction returns */
app.get('/returns', (req, res) => {
    let trans = data.getTransactionReturns(transactions, today_prices);
    res.send(trans);
});

/* Client requests basic data for a stock */
app.post('/basicStock', (req, res) => {
    const stockSearch = (req.body).stock
    data.getStockBasics(stockSearch).then(resp => res.send(resp)
    ).catch(err => console.log(err))   
})


app.listen(port, () => console.log(`Server started on port ${port}`));