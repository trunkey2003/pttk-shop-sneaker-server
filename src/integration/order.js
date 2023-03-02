const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    products: {
      type: Object,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "processing",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
