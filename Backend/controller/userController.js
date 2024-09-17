const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async(req, res) => {
    const existedUser = await User.findOne({email: req.body.email})
    if (existedUser!==null) { 
        return res.status(409).json({error: "Account already exist with this gmail"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const {first_name,last_name, email,phone} = req.body
    try {
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            phone: phone,
        })
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const loginUser= async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    console.log(user)
    if (user === null) {
        return res.status(404).json({error: "User does not exist"})
    }
    const userPayload = {id: user._id, email: user.email}
    try {
        if ( await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET)
            const userData = {token: token, user: user, message: "Logged In"}
            return res.status(200).json(userData)
        } else {
            return res.status(500).json({error: "Incorrect Password"})
        }
    } catch(err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {createUser, loginUser}