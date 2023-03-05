const CartController = require("../controllers/cart.controller");
const { authJwt } = require("../../middlewares");
module.exports = (app) => {
  app.use(function (req, res, next) {
      res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
      );
      next();
  });

  app.post("/api/addToCart", CartController.addToCart);
  app.get("/api/cart", CartController.getCartData);
  app.put("/api/cart/update/:id", CartController.updateCart);
  app.delete("/api/removeCart/:id", CartController.removeCartData);
};