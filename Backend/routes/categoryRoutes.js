const express = require('express')
const {addCategory,updateCategory,deleteCategory, fetchAllCategories } = require('../controller/categoryController')
const { authenticateToken, isAdmin } = require('../Middleware/auth')
const router = express.Router()

router.get('/getCategories', fetchAllCategories)
router.post('/addCategory', authenticateToken,isAdmin, addCategory)
router.put('/updateCategory/:id', authenticateToken, isAdmin, updateCategory);
router.delete('/deleteCategory/:id',authenticateToken, isAdmin,deleteCategory)

module.exports = router