const Order = require("../models/orderModel");
const Products = require("../models/productModel");

const placeOrder = async (req, res) => {
  console.log(req.body);
  try {
    const order = await Order.create(req.body);
    //update quantity of products after placing order
    // for (const item of order.products) {
    //   await Products.updateOne(
    //     { _id: item.product._id },
    //     { $inc: { quantityAvailable: -item.quantity } }
    //   );
    // }
    res.status(200).json("Your order has been placed");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelOrder = async (req, res) => {
  //update quantity of products after placing order
};

const updateOrder = async (req, res) => {
  //update quantity of products after placing order
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "perfume_users",
          localField: "customer",
          foreignField: "_id",
          as: "customerDetails"
        }
      },
      // {
      //   $unwind: "$categoryDetails"
      // }
    ])
    if (orders.length === 0) {
      return res.json({ message: "No orders are placed yet" });
    }
    return res.status(200).json(orders);
  } catch (err) {
    return res.json(err);
  }
};

const getUserOrders = async (req, res) => {
  //latest order first
  try {
    const orders = await Orders.find({ customer: req.params.id }).sort({
      createdAt: -1,
    }); // Sort by createdAt in Descending order
    if (orders.length <= 0) {
      return res.json("You have no order");
    }
    return res.json(orders);
  } catch (err) {
    return res.json(err);
  }
};

//change order Status and verify user on email/number
const deliverOrder = async (req, res) => {
  try {
    await Order.updateOne(
      { _id: req.params.id },
      { $set: { orderStatus: true } }
    );
    return res.json("Order Fulfilled");
  } catch (err) {
    return res.json(err);
  }
};

module.exports = {
  placeOrder,
  cancelOrder,
  updateOrder,
  getOrders,
  getUserOrders,
  deliverOrder,
};
