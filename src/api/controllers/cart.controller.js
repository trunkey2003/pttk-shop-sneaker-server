const { getUserId } = require("../../middlewares/cartService");
const Cart = require("../../integration/cart");
const User = require("../../integration/user");
const Product = require("../../integration/product");

class CartController {
  async addToCart(req, res) {
    const {
      quantity,
      productId,
    } = req.body;
    let user = getUserId(req.headers['x-access-token'])
    if (!user.authozied && !user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // kiểm tra productId có tồn tại không, nếu không thì trả lỗi
    if(!productId) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }
    const product = await Product.findOne({ _id: productId })
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    const cart = await Cart.create({
      quantity,
      userId: user.id,
      productId,
    });

    res.status(200).json({
      success: true,
      authorization: user.authozied,
      userId: user.id,
      cart,
    });
  }

  async updateCart(req, res) {
    
    // - lấy productId từ req.body.productId
    // - lấy userId getUserId
    // - lấy danh sách cart của user đó, product đó: Cart.findOne({userId, productId})
    // - Nếu có thì update quantity
    // - Nếu thì tạo mới
    // - Tính tới trường hợp quantity = 0 thì xóa cart, quantity < 0
    let user = getUserId(req.headers['x-access-token'])
    if (!user.authozied && !user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    try {
      const { quantity } = req.body;
      Cart.findOneAndUpdate({ _id: req.params.id }, { quantity: quantity }, null)
        .then((cart) => {
          res.status(200).json({
            success: true
          });
        })
        .catch((err) => {
          res.status(400).json({ message: err });
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getCartData(req, res) {

    // - lấy userId getUserId
    // - lấy danh sách cart của user đó, product đó: Cart.findOne({userId})
    // - lấy chi tiết product từ Product model
    let user = getUserId(req.headers['x-access-token'])
    if (!user.authozied && !user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    
    try {
      const cartData = await Cart.find({ userId: user.id });
      const productIds = cartData.map((item) => item.productId);
      const products = await Product.find({ _id: { $in: productIds } });
      res.status(200).json({
        success: true,
        cartData,
      });
      cartData.map(item => {
        const product = products.find(product => product._id === item.productId)
        if (product) item = { ...item, product}
      })
    } catch (error) {
      console.log(error);
    }
  }

  async removeCartData(req, res) {

    let user = getUserId(req.headers['x-access-token'])
    if (!user.authozied && !user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    try {
      Cart.findOneAndDelete({ _id: req.params.id })
        .then((cart) => {
          res.status(200).json({
            success: true
          });
        })
        .catch((err) => {
          res.status(400).json({ message: err });
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CartController();
