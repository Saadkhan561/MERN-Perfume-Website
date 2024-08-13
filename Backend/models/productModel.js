const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    quantityAvailable: { type: Number, default: 0 },
    amount: {type: [Number], required: true},
    imageUrl: { type: String },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("perfume_products", productSchema);
