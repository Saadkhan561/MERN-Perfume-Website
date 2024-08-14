const mongoose = require("mongoose");
const Products = require("../models/productModel");
const Category = require("../models/categoryModel");
const Order = require("../models/orderModel");




//get pinned product first
const getAllProducts = async (req, res) => {
  //image handling
  try {
    //const products = await Product.find({}).sort({ createdAt: -1 });
    const products=await Products.aggregate([
      {
        $lookup: {
          from: "Category",
          localField: "category",
          foreignField: "id",
          as: "categoryDetails"
        }
      },
      {
        $unwind: "$categoryDetails"
      },
      {
        $match: {
          productStatus: true
        }
      },
      {
        $group: {
          _id: "$categoryDetails._id",
          products: { $push: "$$ROOT" }
        }
      },
      {
        $sort: {
          "products.pinned": -1,// pinnedStatus true comes first  within each category
          "products.createdAt":-1
        }
      },

      {
        $project: {
          _id: 0, 
          category: "categoryDetails.name",
          products: 1 // Include the products array
        }
      }
    ]);
    // const productsWithImages = products.map(product => ({
    //   ...product.toObject(),
    //   imageUrls: product.imagePaths.map(path => `${req.protocol}://${req.get('host')}/uploads/${path.split('/').pop()}`)
    // }));

    // res.json(productsWithImages);
    
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



const trendingProducts = async(req, res) => {
  try {
    const ordersExist = await Order.find();
    if (ordersExist.length==0) {
      return res.staus(200).json({message:"No Trending Products"})
    }

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
        }
        },
        {$match:{"$products.productStatus":true}},
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
            imagePaths: "$product_info.imagePaths",
            discount: "$product_info.discount"
        }},
        { $sort: { order_count: -1 } },
        { $limit: 10 }
      ]
    )
    return res.status(200).json(order)
  } catch(err) {
    return res.json(err)
  }
}
const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  const product = await Products.findOne({ _id: id });
  // const imageUrls = product.imagePaths.map(path => `/images/${path.split('/').pop()}`);
  // console.log(imageUrls);
  // const imageUrls = product.imagePaths.map(path => `${req.protocol}://${req.get('host')}/images/${path.split('/').pop()}`);
    if (!product) {
     res.json("No Product Found")
    } else {
      return res.json(product)
    //  return res.json({
    //     ...product.toObject(),
    //     imageUrls // Add image URLs to the response
    //   });
    }
 
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = Products.aggregate([
      {
        $lookup: {
          from: "Category",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      {
        $unwind: "$categoryDetails"
      },
      {
        $match: {
          productStatus: true,
          "categoryDetails": req.params.id
        }
      },
      {
        $sort: {
          pinned: -1  //which means true (1) comes first
        }
      },
      {
        $project: {
          name: 1,
          brand: 1,
          description: 1,
          category: "$categoryDetails.name",
          quantityAvailable: 1,
          price: 1,
          discount: 1,
          pinned: 1,
          imagePaths:1
        }
      }
    ]);

    if (products.length > 0) {
      return res.status(200).json(products)
      // const productsWithImages = products.map(product => ({
      //   ...product.toObject(),
      //   imageUrls: product.imagePaths.map(path => `/images/${product.category}/${file.originalname}`)
      //   // imageUrls: product.imagePaths.map(path => `${req.protocol}://${req.get('host')}/uploads/${path.split('/').pop()}`)
      // }));
      // return res.json(productsWithImages);
      
    }
    else {
      return res.json("No Product Found")
    }
  }
  catch (err) {
    return res.json(err)
  }
}


const postProduct = async (req, res) => {
  try {
    const { name,description,category,price,discount,brand,quantityAvailable } = req.body;
    const imagePaths = req.files.map(file => `${category}/${file.originalname}`);

    const product = new Products({
      name,
      description,
      price,
      discount,
      brand,
      category,
      quantityAvailable,
      imagePaths
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
  // try {
  //   const product = await Products.insertMany(req.body);
  //   res.status(200).json(product);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
};

const reStock = async (req, res) => {
  try {
    await Products.updateOne(
      { _id: req.params.id },
      { $set: { quantityAvailable: req.params.quantity } } 
    );
    return res.json({message:"updated"})
  }
  catch (err) {
    return res.json(err)
  }
}

const pinProduct = async (req, res) => {
  //change value to of pinned (T-->F,F-->T)
  try {
    await Products.updateOne(
      { _id: req.params.id },
      {pinned:!req.params.status}
    )
    return res.status(200).json("updated")
  }
  catch (err) {
    return res.json(err)
  }
}

const setDiscount = async (req, res) => {
  try {
    await Products.updateOne(
      { _id: req.params.id },
      {discount:req.params.discount}
    )
    return res.status(200).json("updated")
  }
  catch (err) {
    return res.json(err)
  }
  
}


const deleteProduct = async (req, res) => {
  try {
    await Products.deleteOne(
      { _id: req.params.id },
      {productStatus:false}
    )
    return res.status(200).json("updated")
  }
  catch (err) {
    return res.json(err)
  }
  
}

const updateProduct = async (req, res) => {
  //complete
}

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
  getProductsByCategory,
  reStock,
  pinProduct,
  setDiscount,
  searchResults,
  trendingProducts,
  deleteProduct,
  updateProduct
};
