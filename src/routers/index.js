const express = require('express');
const router = express.Router();
const cartRouter = require('./cartRouter');

router.use('/carts', cartRouter);

module.exports = { router };
