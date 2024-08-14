const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const addCategory = async (req, res) => {
  try {
    await Category.create(req.body)
    return res.json("Category Created")
  }
  catch (err) {
    return res.json(err)
    }
}

const updateCategory = async (req, res) => {
  try {
    await Category.updateOne(
      { _id: req.params.id },
      {name:req.params.name}
    )
    return res.json("Updated")
  }
  catch (err) {
    return res.json(err)
  }
  
    
}

const deleteCategory = async (req, res) => {
  //will also delete all its product
  try {
    await Category.deleteOne({ _id: req.params.id })
    await Products.deleteMany({ category: req.params.id })
    return res.json("Deleted")
  }
  catch (err) {
    return res.json(err)
  }  
}


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
  
module.exports={fetchAllCategories,addCategory,updateCategory,deleteCategory}