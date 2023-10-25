const express = require('express');

const { cartRouter } = require('./cartRouter');
const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');
const { reviewRouter } = require('./reviewRouter');
const { orderRouter } = require('./orderRouter');
const { testRouter } = require('./testRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);
router.use('/reviews', reviewRouter);
router.use('/orders', orderRouter);
router.use('/test', testRouter);

module.exports = { router };
