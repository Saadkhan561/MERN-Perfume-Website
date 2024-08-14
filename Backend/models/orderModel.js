const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 1 },
    },
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 }, //for overall discount
  orderStatus: { type: Boolean, default: false } ,//fulfilled or pending
  shippingAddress: {
    city: { type: String, required: true },
    address:{type:String,required:true}
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
