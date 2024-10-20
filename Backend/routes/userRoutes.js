const express = require('express')
const { createUser, loginUser, resetPassword } = require('../controller/userController')
const router = express.Router()
// FUNCTION TO AUTHORIZE USER 


router.post('/createUser',createUser)
router.post('/loginUser', loginUser)
router.post('/resetPassword', resetPassword)

module.exports = router