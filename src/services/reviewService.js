const { reviewDao } = require('../models');

const getReviews = async (productId) => {
  console.log('S.getReviews', getReviews);
  const data = await reviewDao.getReviews(productId);
  return data;
};

const createReviews = async (userId, contents, images, productId, rating) => {
  const data = await reviewDao.createReviews(
    userId,
    contents,
    images,
    productId,
    rating
  );
  return data;
};

module.exports = {
  getReviews,
  createReviews,
};
