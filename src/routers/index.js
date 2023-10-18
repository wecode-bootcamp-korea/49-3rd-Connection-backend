const express = require('express');

const { orderRouter } = require('./orderRouter');

const router = express.Router();

router.use('/orders', orderRouter);

module.exports = { router };
