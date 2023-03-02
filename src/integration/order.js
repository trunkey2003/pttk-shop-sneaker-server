const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
