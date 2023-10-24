const express = require('express');

const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');
const { reviewRouter } = require('./reviewRouter');
const { orderRouter } = require('./orderRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/reviews', reviewRouter);
router.use('/orders', orderRouter);

module.exports = { router };
