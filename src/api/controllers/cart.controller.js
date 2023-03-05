const Cart = require("../../integration/cart");

class CartController {
  async addToCart(req, res) {
    const {
      productName,
      quantity,
      productImage,
      productPrice,
      userId,
      productId,
    } = req.body;
    const cart = await Cart.create({
      productName,
      quantity,
      productImage,
      productPrice,
      userId,
      productId,
    });

    res.status(200).json({
      success: true,
      cart,
    });
  }

  async updateCart(req, res) {
    try {
      const { quantity } = req.body;
      const cart = await Cart.findByIdAndUpdate(req.params.id);

      if (!cart) {
        return next(new Error());
      }

      await cart.update({
        quantity,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCartData(req, res) {
    try {
      const cartData = await Cart.find({ userId: req.body.userId });
      res.status(200).json({
        success: true,
        cartData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async removeCartData(req, res) {
    try {
      const cartData = await Cart.findById({ userId: req.params.id });
      if (!cartData) return next(new Error());
      else await cartData.remove();
      res.status(200).json({
        success: true,
        message: "Item removed from cart",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CartController();
