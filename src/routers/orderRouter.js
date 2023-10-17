const express = require('express');
const orderController = require('../controllers');

const router = express.Router();

router.post('/', ,orderController.); // 넣어야 함 

module.exports = { router }
