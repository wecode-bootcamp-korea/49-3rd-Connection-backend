const express = require('express');
const { reviewController } = require('../controllers');

const reviewRouter = express.Router();

reviewRouter.get('/get/:productId', reviewController.getReviews);
reviewRouter.post('/create/:productId', reviewController.createReviews);

module.exports = {
  reviewRouter,
};
