const express = require('express');
const { verifyToken } = require('../../middlewares');
const { cartController } = require('../controllers');
const { getCartController } = cartController;
const router = express.Router();

router.get('/', verifyToken, getCartController);
router.post('/', verifyToken, creatCartController);
router.patch('/', verifyToken, updateCartController);
router.delete('/,', verifyToken, removeCarcontroller);

module.exports = router;
