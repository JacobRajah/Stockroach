var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://query.dropbase.io/dd3qwne2p2znw8my37386zr/amd',
  headers: { 
    'Authorization': 'BEARER TOKEN'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
