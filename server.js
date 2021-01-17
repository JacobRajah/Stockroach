const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); //set env
var path = require('path');
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

const data = require('./server/accessDropbase');

/* Functions for when using built version of React scripts. 
   if you want to test production execute <npm run build> then
   execute <node server.js>*/
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

/* Place all get and post paths here: */

app.get('/stockData', (req, res) => {
    data.getStockData('googl').then(resp => res.send(resp)).catch(err => console.log(err))
});

/* Client asks for ema_50 data*/
app.post('/stockReq', (req, res) => {
    const stockSearch = (req.body).stock
    data.getStockData(stockSearch).then(resp => res.send(resp)).catch(err => console.log(err))
})

app.listen(port, () => console.log(`Server started on port ${port}`));