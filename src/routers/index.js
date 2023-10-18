const express = require('express');

const router = express.Router();
const cartRouter = require('./cartRouter');
cartRouter.use('/carts', cartRouter);
const cartRouter = require('./productRouter');
router.use('/carts', cartRouter);

router.use('/products', productRouter);

module.exports = { router };
module.exports = cartRouter;
