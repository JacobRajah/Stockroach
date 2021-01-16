const express = require('express');
var path = require('path');
const port = process.env.PORT || 5000;
const app = express();

/* Functions for when using built version of React scripts. 
   if you want to test production execute <npm run build> then
   execute <node server.js>*/
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

/* Place all get and post paths here: */

//TEST ENDPOINT
app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'Jacob', lastName: 'Doe'},
        {id: 2, firstName: 'Steve', lastName: 'Smith'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'}
    ]

    res.send(customers);
});

app.listen(port, () => console.log(`Server started on port ${port}`));