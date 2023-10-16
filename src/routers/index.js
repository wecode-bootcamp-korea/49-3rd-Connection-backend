const express = require('express');

const router = express.Router();
const cartRouter = require('./cartRouter');

router.use('/carts', cartRouter);

router.use('/products', productRouter);

module.exports = { router };
