const express = require('express');
var product_router = express.Router();
var ProductController = require('../controllers/product.controller')

product_router.get('/',ProductController.getProduct);
product_router.get('/detail/:id',ProductController.getProductDetail)
product_router.post('/add',ProductController.addProduct);
product_router.delete('/delete/:id',ProductController.deleteProduct);
product_router.put('/update/:id',ProductController.updateProduct);
module.exports=product_router;

