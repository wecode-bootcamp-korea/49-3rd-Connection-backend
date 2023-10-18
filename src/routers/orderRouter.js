const express = require('express');
const { orderController } = require('../controllers');

const postRouter = express.Router();

postRouter.post('/createorders', orderController.createOrders); // 넣어야 함

module.exports = { postRouter };
