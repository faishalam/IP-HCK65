const express = require('express')
const PaymentController = require('../controllers/payment')
const authentication = require('../middleware/authenctication')
const authorization = require('../middleware/authorization')
const paymentRouter = express()


paymentRouter.get('/payment/midtrans/initiate', authentication, PaymentController.inititateMidtransTrx)

module.exports = paymentRouter