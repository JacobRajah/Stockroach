/* File for accessing data from cockroach DB for display*/
const axios = require('axios');
// require('dotenv').config(); //set env
//googl msft

function getMicrosoftClose(){
    axios({
        method: 'get',
        url: 'https://query.dropbase.io/d3qWnE2P2znW8my37386zr/msft',
        headers: {Authorization: `Bearer ${process.env.dropbase}`},
        params: {
            close: 'lt.213'
        }
    }).then(res => console.log(res.data)).catch(err => console.log(err))
}

async function getStockData(stock) {
    var stock_data = await axios({
        method: 'get',
        url: `https://query.dropbase.io/d3qWnE2P2znW8my37386zr/${stock}`,
        headers: {Authorization: `Bearer ${process.env.dropbase}`},
        params: {
            limit: 250,
        }
    });
    stock_data = await stock_data.data
    return filterFiftyDay(await stock_data)
}

function filterFiftyDay(data) {
    var formatted = data.map((e, i) => {
        time = e.time
        value = e.ema_50;
        return {time, value};
    })
    return formatted
}

// getStockData('msft').then(res => console.log(res))

module.exports.getStockData = getStockData