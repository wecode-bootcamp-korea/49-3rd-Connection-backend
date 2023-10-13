const express = require('express');
const { userController } = require('../controllers');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/', userController.signIn);

module.exports = { userRouter };
