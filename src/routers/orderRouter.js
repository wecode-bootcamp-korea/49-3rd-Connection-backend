const express = require('express');

const { orderController } = require('../controllers');
const { validateToken } = require('../middleware/auth');

const orderRouter = express.Router();

orderRouter.post('/', validateToken, orderController.createOrders);

module.exports = { orderRouter };
