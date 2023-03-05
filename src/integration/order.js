const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
