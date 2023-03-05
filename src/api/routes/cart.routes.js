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

  app.post("/api/addToCart", [authJwt.verifyToken], CartController.addToCart);
  app.get("/api/cart", [authJwt.verifyToken], CartController.getCartData);
  app.put("/api/cart/update/:id", [authJwt.verifyToken], CartController.updateCart);
  app.delete("/api/cart/remove/:id", [authJwt.verifyToken], CartController.removeCartData);
};
