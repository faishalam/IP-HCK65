const express = require('express')
const UserController = require('../controllers/userController')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authenctication')
const userRouter = express.Router()


userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)
userRouter.post("/google-login", UserController.googleLogin)
userRouter.use(authentication)
userRouter.get("/users/me", UserController.fetchUser)
userRouter.patch("/users/me/upgrade", UserController.upgradeAccount)


module.exports = userRouter