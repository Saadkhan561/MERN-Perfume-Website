const express = require('express')
const { placeOrder, updateOrder, cancelOrder,getUserOrders,getOrders, changeOrderStatus } = require('../controller/orderController')
const {authenticateToken,isAdmin}=require('../Middleware/auth')
const router = express.Router()


router.post('/placeOrder', placeOrder)
router.put('/updateOrder/:id', authenticateToken, updateOrder)
router.delete('/cancelOrder/:id', authenticateToken, cancelOrder)
router.get('/getUserOrder/:id', getUserOrders)
router.get('/getOrders', authenticateToken, getOrders)
router.put('/orderStatus',authenticateToken, isAdmin,changeOrderStatus)

module.exports = router