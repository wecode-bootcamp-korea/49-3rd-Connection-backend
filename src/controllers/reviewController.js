const { reviewService } = require('../services');

const getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;
    const data = await reviewService.getReviews(productId);

    return res.status(200).json({
      message: 'SUCCESS',
      review: data,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed read the review' });
  }
};

const createReviews = async (req, res) => {
  try {
    const { userId, contents, images, productId, rating } = req.body;
    const data = await reviewService.createReviews(
      userId,
      contents,
      images,
      productId,
      rating
    );

    return res.status(200).json({
      message: 'SUCCESS',
      review: data,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create a review' });
  }
};

module.exports = {
  getReviews,
  createReviews,
};
