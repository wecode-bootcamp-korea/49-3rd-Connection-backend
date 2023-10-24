const express = require('express');
const { orderController } = require('../controllers');

const orderRouter = express.Router();

orderRouter.post('/now', orderController.createOrder);
module.exports = {
  orderRouter,
};
