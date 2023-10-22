const express = require('express');

const { productRouter } = require('./productRouter');
const { reviewRouter } = require('./reviewRouter');

const router = express.Router();

router.use('/products', productRouter);
router.use('/reviews', reviewRouter);

module.exports = { router };
