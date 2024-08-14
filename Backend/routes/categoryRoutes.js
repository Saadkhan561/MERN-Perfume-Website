const express = require('express')
const { getCategories, addCategory,updateCategory,deleteCategory } = require('../controller/categoryController')
const { authenticateToken, isAdmin } = require('../Middleware/auth')
const router = express.Router()

router.get('/getCategories', getCategories)
router.post('/addCategory', authenticateToken,isAdmin, addCategory)
router.put('/updateCategory/:id', authenticateToken, isAdmin, updateCategory);
router.delete('/deleteCategory/:id',authenticateToken, isAdmin,deleteCategory)

module.exports = router