const express = require('express');
var productList = require('../services/productService')
const router = express.Router();
router.get('/api/product',(req,res)=>{
    var products=productList();
    products.then(product=>{
        res.status(200).send(product);
    })
})



module.exports=router;