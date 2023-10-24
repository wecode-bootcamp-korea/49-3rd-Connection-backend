const express = require('express');
const { asyncWrap } = require('../utils/errorHandler');

const { orderController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

const orderRouter = express.Router();

orderRouter.post('/', verifyToken, orderController.createOrders);
// orderRouter.post('/', verifyToken, asyncWrap(orderController.createOrders));

module.exports = { orderRouter };
