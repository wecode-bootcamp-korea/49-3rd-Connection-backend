const express = require('express');

const { orderController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

const orderRouter = express.Router();

// orderRouter.post('/', orderController.createOrders); //토큰 없이
orderRouter.post('/', verifyToken, orderController.createOrders);

module.exports = { orderRouter };
