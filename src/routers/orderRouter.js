const express = require('express');
const { orderController } = require('../controllers');

const orderRouter = express.Router();

orderRouter.post('/', orderController.createOrders);

module.exports = { orderRouter };
