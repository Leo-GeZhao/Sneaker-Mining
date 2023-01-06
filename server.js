const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const stockXAPI = require("stockx-api");
const stockX = new stockXAPI();

require("dotenv").config();
require("./config/database");

const inventoryRouter = require("./routes/inventory");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/", inventoryRouter);

app.post("/search-sneaker", function (req, res, next) {
  stockX
    .fetchProductDetails(req.body.url)
    .then((products) => res.send(products))
    .catch((err) =>
      console.log(`Error scraping product details: ${err.message}`)
    );
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
