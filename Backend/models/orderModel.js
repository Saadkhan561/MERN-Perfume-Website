const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      size: { type: String },
      quantity: { type: Number, default: 0 },
    },
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("perfume_orders", orderSchema);
