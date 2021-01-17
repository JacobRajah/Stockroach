/* File for accessing data from cockroach DB for display*/
const axios = require('axios');
require('dotenv').config(); //set env
//googl msft

function getMicrosoftClose(){
    axios({
        method: 'get',
        url: 'https://query.dropbase.io/d3qWnE2P2znW8my37386zr/msft',
        headers: {Authorization: `Bearer ${process.env.dropbase}`},
        params: {
            close: 'lt.213'
        }
    }).then(res => console.log(res.data)).catch(err => console.log(err));
}

// Give the function a stock desired and metric
async function getStockData(stock, metric) {
    var stock_data = await axios({
        method: 'get',
        url: `https://query.dropbase.io/d3qWnE2P2znW8my37386zr/${stock}`,
        headers: {Authorization: `Bearer ${process.env.dropbase}`},
        params: {
            limit: 250,
        }
    });
    stock_data = await stock_data.data;
    return filter(await stock_data, metric);
}

function filter(data, metric) {
    var formatted = data.map((e, i) => {
        time = e.time
        value = e[metric];
        return {time, value};
    });
    return formatted.reverse();
}

//Gets the most recent data on a stock
async function getStockBasics(stock) {
    var stock_data = await axios({
        method: 'get',
        url: `https://query.dropbase.io/d3qWnE2P2znW8my37386zr/${stock}`,
        headers: {Authorization: `Bearer ${process.env.dropbase}`},
        params: {
            limit: 1,
        }
    });
    return filterBasic(await stock_data.data);
}

function filterBasic(stock_data){
    formatted = []
    for(const key in stock_data[0]){
        formatted.push({stat: key, value: stock_data[0][key]})
    }
    return formatted
}
// getStockData('msft', 'open').then(res => console.log(res))

// getStockBasics('nvda').then(res => console.log(res)).catch(err => console.log(err));

// Return transactions
function getTransactions(transaction_dict) {
    return transaction_dict;
}

function getTransactionReturns(transaction_dict, prices_dict) {
    return calculateReturns(transaction_dict, prices_dict);
}

function getFiltered(transaction_dict, prices_dict, filter, val) {
    if (filter === 'stock') {
        return filterByStock(val, transaction_dict);
    }
    else if (filter === 'application') {
        return filterByApplication(val, transaction_dict);
    }
    else if (filter === 'transaction') {
        return filterByTransaction(val, transaction_dict);
    }
    else {
        return filterByUsername('foobar', transaction_dict);
    }
}

function calculateReturns(transaction_dict, prices_dict) {
    const trans_ord = transaction_dict.sort((a, b) => (new Date(b['date_bought'])) - (new Date(b['date_bought'])));

    let input = 0;
    let totalGains = 0;
    let totalLosses = 0;
    let returns = 0;
    let output = 0;
    let roi = 0;

    let allInput = {};
    let returnsOnInv = {}; // <-- Rename to Returns on Investments


    for (let i=0; i < trans_ord.length; i++)
    {
        if (trans_ord[i].transaction === 'buy')
        {
            let stock_today = prices_dict[(trans_ord[i].stock)];
            let worth_today = (stock_today * trans_ord[i].shares);
            let specInput = (trans_ord[i].price_bought * trans_ord[i].shares);
            let specCapGains = (worth_today - specInput) / worth_today;

            let diff = worth_today - specInput;
            if (diff > 0)
            {
                totalGains += diff;
            }
            else
            {
                totalLosses += diff;
            }

            input += specInput;
            returns += diff;
            output += worth_today;
            roi += specCapGains

            if (trans_ord[i].stock in returnsOnInv)
            {
                returnsOnInv[trans_ord[i].stock] += specCapGains;
                allInput[trans_ord[i].stock] += specInput;
            }
            else
            {
                returnsOnInv[trans_ord[i].stock] = specCapGains;
                allInput[trans_ord[i].stock] = specInput;
            }

        }
    }

    return {
        "input": input,
        "returns": returns,
        "output": output,
        "totalGains": totalGains,
        "totalLosses": totalLosses,
        "allInput": allInput,
        "allReturnsOnInv": returnsOnInv,
        "totalROI": roi
    }
}

function filterByApplication(application, transactions_dict) {
    let data_filter;
    return data_filter = transactions_dict.filter(element => element.application === application);
}

function filterByStock(stock, transactions_dict) {
    let data_filter;
    return transactions_dict.filter(element => element.stock === stock);
}

function filterByUsername(username, transactions_dict) {
    let data_filter;
    return data_filter = transactions_dict.filter(element => element.username === username);
}

function filterByTransaction(transaction, transactions_dict) {
    let data_filter;
    return data_filter = transactions_dict.filter(element => element.transaction === transaction);
}


module.exports.getStockData = getStockData;
module.exports.getStockBasics = getStockBasics;
module.exports.getTransactions = getTransactions;
module.exports.getTransactionReturns = getTransactionReturns;
