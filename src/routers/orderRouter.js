const express = require('express');
const { orderController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

const orderRouter = express.Router();

orderRouter.post('/now', verifyToken, orderController.createOrder);
orderRouter.post('/', verifyToken, orderController.createOrders);

module.exports = {
  orderRouter,
};
