const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockSchema = new Schema({
    symbol: { type: String, required: true },
    likes: { type: Array, default: [] },
});

const Stock = mongoose.model("Stock", StockSchema);

exports.Stock = Stock;