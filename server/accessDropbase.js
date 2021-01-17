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

async function getStockBasics(stock) {
    var stock_data = await axios({
        method: 'get',
        url: `https://query.dropbase.io/d3qWnE2P2znW8my37386zr/${stock}`,
        headers: {Authorization: `Bearer ${process.env.dropbase}`},
        params: {
            limit: 1,
        }
    });
    return await stock_data.data;
}
// getStockData('msft', 'open').then(res => console.log(res))

// getStockBasics('nvda').then(res => console.log(res)).catch(err => console.log(err));

module.exports.getStockData = getStockData;
module.exports.getStockBasics = getStockBasics;