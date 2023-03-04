const product = require('../integration/product')
const mongoose = require('mongoose')
async function ProductList(){
    var products =await product.find();
    return products;
}
async function ProductDetail(id){
    console.log(typeof(id));
    var products =await product.findOne({_id:id})
    return products;
}
module.exports={ProductList,ProductDetail};