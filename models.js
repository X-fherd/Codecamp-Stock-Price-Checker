const mongoose = require("mongoose");
const { schema } = mongoose;

const StockSchema = new schema({
    symbol: {type: String, required: true},
    likes: {type: String, default: []},
});
const Stock = mongoose.model("Stock", StockSchema);

exports.Stock = Stock;