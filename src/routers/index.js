const express = require('express');

const router = express.Router();

const orderRouter = require('./orderrRouter');

router.use('/orders', orderRouter.router);

module.exports = router;
