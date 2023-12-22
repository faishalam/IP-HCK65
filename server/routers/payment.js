const express = require('express')
const PaymentController = require('../controllers/payment')
const authentication = require('../middleware/authenctication')
const paymentRouter = express.Router()


paymentRouter.get('/payment/midtrans/initiate', authentication, PaymentController.inititateMidtransTrx)

module.exports = paymentRouter