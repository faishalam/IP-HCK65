const express = require('express')
const router = express.Router()
const article = require('./article')
const user = require('./user')
const payment = require('./payment')


router.use("/", user)
router.use("/", article)
router.use('/', payment)




module.exports = router