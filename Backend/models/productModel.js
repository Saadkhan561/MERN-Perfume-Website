const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true }, 
    price: { type: Number, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: { type: String, required: true },
    quantityAvailable: { type: Number, default: 0 },
    imagePaths: [
      { type: String }
    ],
    discount: { type: Number, default: 0 },
    pinned: { type: Boolean,default:false }, //for featuring products
    productStatus:{type:Boolean,default:false}//for soft delete
  },
  
);

module.exports = mongoose.model("Products", productSchema);
