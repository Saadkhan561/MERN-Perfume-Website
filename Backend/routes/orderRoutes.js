const express = require('express')
const { placeOrder, updateOrder, cancelOrder,getUserOrders,getOrders,deliverOrder } = require('../controller/orderController')
const {authenticateToken,isAdmin}=require('../Middleware/auth')
const router = express.Router()


router.post('/placeOrder', authenticateToken, placeOrder)
router.put('/updateOrder/:id', authenticateToken, updateOrder)
router.delete('/cancelOrder/:id', authenticateToken, cancelOrder)
router.get('/getUserOrder/:id', getUserOrders)
router.get('/getOrders', authenticateToken, isAdmin, getOrders)
router.put('/orderStatus/:id',authenticateToken, isAdmin,deliverOrder)

module.exports = router