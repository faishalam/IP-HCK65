const express = require('express')
const UserController = require('../controllers/userController')
const userRouter = express()

userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)


module.exports = userRouter