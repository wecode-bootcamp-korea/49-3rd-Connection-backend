const express = require('express');
const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');
const { cartRouter } = require('./cartRouter');

const router = express.Router();

// router.use('/', (req, res) => {
//   return res.status(200).json({ message: 'pong' });
// });
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);

module.exports = { router };
