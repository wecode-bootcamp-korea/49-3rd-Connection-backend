const express = require('express');
const { reviewController } = require('../controllers');

const reviewRouter = express.Router();

reviewRouter.get('/:productId', reviewController.getReviews);
reviewRouter.post('/:productId', reviewController.createReviews);

module.exports = {
  reviewRouter,
};
