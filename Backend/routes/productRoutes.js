const Category = require('../models/categoryModel')
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  searchResults,
  trendingProducts,
  deleteProduct,
  getProductsByCategory,
  reStock,
  setDiscount,
  pinProduct,
  getProductImages,
  getProducts,
} = require("../controller/productController");
const { authenticateToken, isAdmin } = require("../Middleware/auth");
const path = require("path");
const router = express.Router();
const upload = multer()


// CODE FOR MULTER STORAGE FOR STORING IMAGE FILES
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const category = await Category.findById(req.body.category);
      if (!category) {
        console.log('Category not found');
        return cb(new Error('Category not found'), null);
      }
      const uploadDir = path.join(__dirname, '../images', category.name, req.body.name);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    } catch (error) {
      console.error('Error fetching category:', error);
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const uploadImages = multer({ storage: storage });

router.get("/getProductsByCategory/:id", getProductsByCategory);
router.get("/getProducts", getAllProducts);
// FOR FETCHING NON FILTERED PRODUCTS
router.get("/getAllProducts", getProducts)
router.get("/trendingProducts", trendingProducts);
router.get("/images/:category/:productName", getProductImages);
router.get("/getProductById/:id", getProductById);
router.get("/search", searchResults);

router.put("/updateProduct/:id", authenticateToken, isAdmin, updateProduct);
router.put(
  "/deleteProduct/:id/:status",
  authenticateToken,
  isAdmin,
  deleteProduct
);
router.put("/reStock/:id/:quantity", authenticateToken, isAdmin, reStock);
router.put(
  "/setDiscount/:id/:discount",
  authenticateToken,
  isAdmin,
  setDiscount
);
router.put("/pinProduct/:id", authenticateToken, isAdmin, pinProduct);

router.post(
  "/addProduct",
  uploadImages.array("images", 3),
  postProduct
);
//router.post('/addProduct', authenticateToken, isAdmin, postProduct)

module.exports = router;
