const mongoose = require("mongoose");
const { schema } = mongoose;

const StockSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    likes: { type: Array, default: [] },
});

const Stock = mongoose.model("Stock", StockSchema);

exports.Stock = Stock;