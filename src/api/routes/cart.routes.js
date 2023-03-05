const CartController = require("../controllers/cart.controller");

module.exports = (app) => {
  app.post("/api/addToCart", CartController.addToCart);
  app.get("/api/cart", CartController.getCartData);
  app.put("/api/cart/update/:id", CartController.updateCart);
  app.delete("/api/removeCart/:id", CartController.removeCartData);
};