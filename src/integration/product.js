const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name:String,
  img:String,
});
const productModel = mongoose.model('product', Product);
 module.exports=productModel;
