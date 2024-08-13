const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json("Your order has been placed");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const trendingProducts = async(req, res) => {
  try {
    const ordersExist = await Order.find();

    const order = await Order.aggregate(
      [
        { $unwind: "$products" },
        { $group: { 
            _id: "$products.product",
            order_count: { $sum: 1 }, 
            total_quantity_sold: { $sum: "$products.quantity" }
        }},
        { $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product_info"
        }},
        { $unwind: "$product_info" },
        { $project: {
            _id: 1,
            order_count: 1,
            total_quantity_sold: 1,
            name: "$product_info.name",
            description: "$product_info.description",
            price: "$product_info.price",
            category: "$product_info.category",
            brand: "$product_info.brand",
            imageUrl: "$product_info.imageUrl",
            discount: "$product_info.discount"
        }},
        { $sort: { order_count: -1 } },
        { $limit: 10 }
      ]
    )
    res.status(200).json(order)
  } catch(err) {
    res.status(500).json({msg: "Error retrieving trending items!"})
  }
}

module.exports = { placeOrder, trendingProducts };
