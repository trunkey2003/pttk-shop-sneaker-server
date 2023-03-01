const product = require('../integration/product')
async function ProductList(){
    var products =await product.find();
    return products;
}
module.exports=ProductList;