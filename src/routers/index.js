const express = require('express');
const router = express.Router();
const cartRouter = require('./cartRouter');
cartRouter.use('/carts', cartRouter);

module.exports = cartRouter;
