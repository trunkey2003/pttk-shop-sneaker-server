const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

const Product = mongoose.model(
    "Product", {
    productname: String,
    productprice: String,
    productdescription: String,
    inStock: int,
}
)

module.exports = db;