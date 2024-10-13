const Order = require("../models/orderModel");
const { ObjectId } = require("mongodb");

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
  const { searchTerm, skip = 0, limit = 2 } = req.query;

  const pipeline = [
    {
      $lookup: {
        from: "perfume_users",
        localField: "customer",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $unwind: "$customerDetails",
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "perfume_products",
        localField: "products.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$_id",
        customerDetails: { $first: "$customerDetails" },
        totalAmount: { $first: "$totalAmount" },
        discount: { $first: "$discount" },
        orderStatus: { $first: "$orderStatus" },
        shippingAddress: { $first: "$shippingAddress" },
        products: {
          $push: {
            product: "$productDetails.name",
            quantity: "$products.quantity",
            option: "$products.option",
            price: "$products.price",
          },
        },
        createdAt: { $first: "$createdAt" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ];
  try {
    if (searchTerm) {
      const orderId = ObjectId.createFromHexString(searchTerm);
      pipeline.push({
        $match: {
          _id: orderId,
        },
      });

      const totalPipeline = [...pipeline];
      totalPipeline.push({
        $count: "orders",
      });

      const totalCountResult = await Order.aggregate(totalPipeline);

      const totalOrders =
        totalCountResult.length > 0 ? totalCountResult[0].orders : 0;

      const totalPages = Math.ceil(totalOrders / limit);

      pipeline.push({ $skip: parseInt(skip) });
      pipeline.push({ $limit: parseInt(limit) });

      const orders = await Order.aggregate(pipeline);
      if (orders.length === 0) {
        return res.json({ message: "No order found..." });
      }

      return res.status(200).json({
        orders,
        totalOrders,
        totalPages,
        currentPage: Math.ceil(skip / limit) + 1,
      });
    }
    const totalPipeline = [...pipeline];
    totalPipeline.push({
      $count: "orders",
    });

    const totalCountResult = await Order.aggregate(totalPipeline);

    const totalOrders =
      totalCountResult.length > 0 ? totalCountResult[0].orders : 0;

    const totalPages = Math.ceil(totalOrders / limit);

    pipeline.push({ $skip: parseInt(skip) });
    pipeline.push({ $limit: parseInt(limit) });

    const orders = await Order.aggregate(pipeline);
    if (orders.length === 0) {
      return res.json({ message: "No orders are placed yet..." });
    }

    return res.status(200).json({
      orders,
      totalOrders,
      totalPages,
      currentPage: Math.ceil(skip / limit) + 1,
    });
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
