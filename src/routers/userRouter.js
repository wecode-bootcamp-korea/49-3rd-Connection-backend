const express = require('express');
const { asyncWrap } = require('../utils/errorHandler');
const { verifyToken } = require('../middleware/auth');
const { userController } = require('../controllers');
const { imageUploader } = require('../middleware/imageUploader');

const userRouter = express.Router();

userRouter.post('/signup', asyncWrap(userController.signUp));
userRouter.post('/duplicate', asyncWrap(userController.checkDuplicatedEmail));
userRouter.post('/', asyncWrap(userController.signIn));
userRouter.post(
  '/seller',
  verifyToken,
  imageUploader.single('image'),
  asyncWrap(userController.sellerSignUp)
);

userRouter.put(
  '/kakao/address',
  verifyToken,
  asyncWrap(userController.insertAddress)
);

userRouter.get('/kakao/callback', userController.kakaoSignIn);

module.exports = {
  userRouter,
};
