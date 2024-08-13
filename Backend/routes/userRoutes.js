const express = require('express')
const { createUser, loginUser } = require('../controller/userController')
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

router.post('/createUser',createUser)
router.post('/loginUser', loginUser)

module.exports = router