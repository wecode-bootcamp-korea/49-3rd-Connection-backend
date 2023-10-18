const express = require('express');
const { orderController } = require('../controllers');

const postRouter = express.Router();

postRouter.post('/createorders', orderController.createOrders);

module.exports = { postRouter };
