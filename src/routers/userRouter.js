const express = require('express');
const { asyncWrap } = require('../utils/errorHandler');
const { userController } = require('../controllers');

const userRouter = express.Router();

userRouter.post('/signup', asyncWrap(userController.signUp));
userRouter.post('/', asyncWrap(userController.signIn));

module.exports = { userRouter };
