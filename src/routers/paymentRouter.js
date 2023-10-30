const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { paymentController } = require('../controllers');
const { asyncWrap } = require('../utils/errorHandler');

const paymentRouter = express.Router();

paymentRouter.post('/', verifyToken, asyncWrap(paymentController.getPayment));

module.exports = {
  paymentRouter,
};
