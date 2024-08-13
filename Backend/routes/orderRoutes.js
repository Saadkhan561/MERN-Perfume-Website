const express = require('express')
const {placeOrder, trendingProducts} = require('../controller/orderController')
const router = express.Router()

router.get('/', trendingProducts)
router.post('/placeOrder', placeOrder)

module.exports = router