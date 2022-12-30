const express = require("express");
const StockXAPI = require("stockx-api");
const stockX = new StockXAPI();

const app = express();

app.use(express.json());

app.post("/search-sneaker", function (req, res, next) {
  stockX
    .fetchProductDetails(req.body.url)
    .then((products) => res.send(products))
    .catch((err) =>
      console.log(`Error scraping product details: ${err.message}`)
    );
});

app.listen(3001, () => {
  console.log("Server started at port 3001");
});
