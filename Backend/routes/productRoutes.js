const express = require('express')
const multer = require('multer')
const fs=require("fs")
const { getAllProducts, getProductById, postProduct, updateProduct, searchResults,trendingProducts, deleteProduct, getProductsByCategory, reStock, setDiscount, pinProduct } = require('../controller/productController')
const {authenticateToken, isAdmin}=require('../Middleware/auth')
const router = express.Router()

// router.get('/getAllProducts', getAllProducts)
router.get('/getProductsByCategory/:id', getProductsByCategory)
router.get('/getProducts',getAllProducts)
router.get('/trendingProducts', trendingProducts)

router.get('/getProductById/:id', getProductById)
router.get('/search', searchResults)


router.put('/updateProduct/:id',authenticateToken,isAdmin,updateProduct)
router.put('/deleteProduct/:id/:status', authenticateToken,isAdmin,deleteProduct);
router.put('/reStock/:id/:quantity', authenticateToken,isAdmin,reStock)
router.put('/setDiscount/:id/:discount',authenticateToken,isAdmin, setDiscount)
router.put('/pinProduct/:id',authenticateToken,isAdmin,pinProduct)

router.post('/addProduct', authenticateToken, isAdmin, uploadImages.array('images', 7), postProduct);
//router.post('/addProduct', authenticateToken, isAdmin, postProduct)


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = `/images/${req.body.category}/`;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir,{ recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadImages = multer({ storage: storage });

module.exports = router