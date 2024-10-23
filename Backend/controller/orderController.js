const Order = require("../models/orderModel");
const { ObjectId } = require("mongodb");

const placeOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    //update quantity of products after placing order
    // for (const item of order.products) {
    //   await Products.updateOne(
    //     { _id: item.product._id },
    //     { $inc: { quantityAvailable: -item.quantity } }
    //   );
    // }
    res
      .status(200)
      .json({ message: "Your order has been placed", order: order });
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
  const { searchTerm, skip = 0, limit = 5 } = req.query;

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
  const { userId, limit } = req.query;
  const id = ObjectId.createFromHexString(userId);
  const limitInt = parseInt(limit, 10);

  const pipeline = [
    {
      $match: {
        customer: id,
      },
    },
    { $sort: { createdAt: -1 } },
  ];

  if (limitInt) {
    pipeline.push({ $limit: limitInt });
  }
  try {
    const orders = await Order.aggregate(pipeline);
    if (orders.length <= 0) {
      return res.json({ message: "You have no orders..." });
    }
    return res.json({ message: "Orders", orders: orders });
  } catch (err) {
    return res.json(err);
  }
};

//change order Status and verify user on email/number
const changeOrderStatus = async (req, res) => {
  const { id, orderStatus } = req.body;
  try {
    await Order.updateOne({ _id: id }, { $set: { orderStatus: orderStatus } });
    return res.status(200).json({ message: "Updated" });
  } catch (err) {
    return res.json(err);
  }
};

const getUserOrderById = async(req, res) => {
  const orderId = await Object.createFromHexString(req.query.orderId)
  try {
    const order = await Order.findOne({_id: orderId})
    return res.status(200).json(order)
  } catch(err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  placeOrder,
  cancelOrder,
  updateOrder,
  getOrders,
  getUserOrders,
  changeOrderStatus,
  getUserOrderById
};
