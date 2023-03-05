const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, "Please enter your product quantity"],
  },
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
});

module.exports = mongoose.model("Cart", Cart);
