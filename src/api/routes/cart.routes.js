const express = require("express");
const cart_router = express.Router();
const CartController = require("../controllers/cart.controller");

module.exports = (cart_router) => {
  cart_router.post("/addToCart", CartController.addToCart);
  cart_router.get("/cart", CartController.getCartData);
  cart_router.put("/cart/update/:id", CartController.updateCart);
  cart_router.delete("/removeCart/:id", CartController.removeCartData);
};
