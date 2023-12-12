const express = require('express')
const router = express.Router()
const article = require('./article')
const user = require('./user')


router.use("/", user)
router.use("/", article)




module.exports = router