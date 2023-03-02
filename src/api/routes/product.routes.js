const express = require('express');
const product_router = express.Router();
var ProductController = require('../controllers/product.controller')

product_router.get('/', ProductController.getProduct);

module.exports = product_router;
