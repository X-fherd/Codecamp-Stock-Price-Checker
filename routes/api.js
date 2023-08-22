'use strict';
const StockModel = require("../models").Stock;
const fetch = require("node-fetch");

async function createStock(stock, like, ip){
  const newStock = new StockModel({
    symbol: stock,
    likes: like ? [ip] : [],
  });
  const savedNew = await newStock.save();
  return savedNew;
}

async function findStock(stock){
  return await StockModel.findOne({ symbol: stock }).exec();
}

async function saveStock(stock, like, ip) {
  let saved = {};
  const foundStock = await findStock(stock);
  if(!foundStock){
    const createSaved = await createStock(stock, like, ip);
    saved = createSaved;
    return saved;
  } else {
    if (like && foundStock.likes.indexOf(ip) === -1){
      foundStock.likes.push(ip);
    }
    saved = await foundStock.save();
    return saved;
  }
}

async function getStock(stock) {
  const response = await fetch(
    `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
  );
  const { symbol, latestPrice } = await response.json();
  return { symbol, latestPrice };
}

module.exports = function (app) {

  app.route('/api/stock-prices').get(async function (req, res) {
    const { stock, like } = req.query;
    if (!stock) {
      return res.status(400).json({ error: "Stock symbol is required." });
    }

    const stocks = Array.isArray(stock) ? stock : [stock];

    const stockData = await Promise.all(stocks.map(async (stockSymbol) => {
      const { symbol, latestPrice } = await getStock(stockSymbol);
      const savedStock = await saveStock(stockSymbol, like, req.ip);

      return {
        stock: symbol || stockSymbol,
        price: latestPrice || 0, // Ensure price is a number
        likes: savedStock.likes.length, // Ensure likes is a number
      };
    }));

    if (stockData.length === 1) {
      res.json({ stockData: stockData[0] });
    } else {
      const [stock1, stock2] = stockData;
      const rel_likes = stock1.likes - stock2.likes;
      res.json({
        stockData: [
          { ...stock1, rel_likes },
          { ...stock2, rel_likes: -rel_likes },
        ],
      });
    }
  });
};
