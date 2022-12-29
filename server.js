const express = require('express')
const Axios = require('axios')
const StockXAPI = require('stockx-api')
const stockX = new StockXAPI()

const app = express()

app.use(express.json());

  
  app.get('/sneaker', function(req, res, next) {
    
    stockX.fetchProductDetails('https://stockx.com/adidas-yeezy-boost-700-magnet')
    .then(product => res.send(product))
    .catch(err => console.log(`Error scraping product details: ${err.message}`));
    
  });
  

  app.listen(3001, () => {
	console.log("Server started at port 3001");
});