const OrderController = require("../controllers/order.controller");

module.exports = (order_router) => {
  order_router.get("/:id", OrderController.getOrder);
  order_router.post("/createOrder", OrderController.createOrder);
  order_router.delete("/deleteOrder/:id", OrderController.deleteOrder);
};
