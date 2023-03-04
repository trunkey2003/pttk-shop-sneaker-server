const mongoose = require('mongoose');
const { Schema } = mongoose;
const product = new Schema({
    name:String,
    model:String,
    description:String,
    img:String,
    price:Number,
})
// ADD PLUGIN
module.exports = mongoose.model('product',product)