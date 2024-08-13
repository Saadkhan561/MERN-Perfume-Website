const express = require('express')
const { getAllProducts, getProductById, fetchAllCategories, postProduct, productPayment, searchResults } = require('../controller/productController')

const router = express.Router()

// FUNCTION TO AUTHORIZE USER 
function authenticateToken(req, res ,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(400)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
  }

// router.get('/', (req, res) => {res.status(200).json("Welcome to home page")})
router.get('/getAllProducts', getAllProducts)
router.get('/getProductById/:id', getProductById)
router.get('/getCategories', fetchAllCategories)
router.post('/newProduct', postProduct)
router.post('/create-checkout-session', productPayment)
router.get('/search', searchResults)

module.exports = router