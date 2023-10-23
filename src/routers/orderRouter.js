const express = require('express');

// const { orderController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

const orderRouter = express.Router();

// orderRouter.post('/', orderController.createOrders);
orderRouter.post('/', verifyToken, orderController.createOrders);

module.exports = { orderRouter };
