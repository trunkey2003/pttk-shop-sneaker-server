const express = require("express");
const order_router = express.Router();
const OrderController = require("../controllers/order.controller");

module.exports = (order_router) => {
  order_router.get("/:id", OrderController.getOrder);
  order_router.post("/create", OrderController.createOrder);
  order_router.delete("/delete/:id", OrderController.deleteOrder);
};
