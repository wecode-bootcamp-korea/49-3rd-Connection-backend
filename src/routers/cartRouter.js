const express = require('express');
const { verifyToken } = require('../middleware');
const { cartController } = require('../controllers');

const router = express.Router();

router.get('/', cartController.getCartController);
// cartRouter.post('/', verifyToken, creatCartController);
// cartRouter.patch('/', verifyToken, updateCartController);
// cartRouter.delete('/', verifyToken, removeCarcontroller);

module.exports = router;
