const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json("Invalid Id");
  } else {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      res.status(500).json("Product not found");
    } else {
      res.status(200).json(product);
    }
  }
};

const postProduct = async (req, res) => {
  try {
    const product = await Product.insertMany(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchAllCategories = async (req, res) => {
  const categories = await Category.find({});
  try {
    if (categories === null) {
      return res.status(404).json("No categories found!");
    }
    return res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FUNCTION FOR ONLINE PAYMENT
const productPayment = async (req, res) => {
  console.log(req.body);
  const lineItems = Object.entries(req.body).map(([key, value]) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: value.name,
      },
      unit_amount: Math.round(value.price),
    },
    quantity: value.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
};

// SEARCH A PRODUCT
const searchResults = async (req, res) => {
  const query = req.query.q;
  try {
    const cleanedQuery = query.trim().replace(/\s+/g, " ");
    const words = cleanedQuery.split(" ").filter((word) => word);
    const regexWords = words.map((word) => new RegExp(word, "i"));

    const searchCategory = await Category.find({
      $or: regexWords.map((word) => ({ name: word })),
    });
    let products = [];
    if (searchCategory.length > 0) {
      const categoryId = searchCategory.map((cat) => cat._id);
      products = await Product.find({ category: { $in: categoryId } });
    } else {
      products = await Product.find({
        $and: regexWords.map((word) => ({
          $or: [{ name: word }, { description: word }, { brand: word }],
        })),
      });
    }
    if (products.length === 0) {
      res.status(404).json({ msg: "No results found..." });
    } else {
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products..." });
  }
};

module.exports = {
  getAllProducts,
  postProduct,
  getProductById,
  fetchAllCategories,
  productPayment,
  searchResults,
};
