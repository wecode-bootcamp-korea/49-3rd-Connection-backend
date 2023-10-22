const { AppDataSource } = require('./dataSource');

const getReviews = async (productId) => {
  const getProductReview = await AppDataSource.query(
    `SELECT
      reviews.id AS reviewId,
      reviews.contents AS contents,
      reviews.images AS reviewImages,
      reviews.rating AS rating,
      reviews.user_id AS userId,
      reviews.product_id AS productId
    FROM reviews
    LEFT JOIN products ON products.id = reviews.product_id
    WHERE reviews.product_id = ?
  `,
    [productId]
  );
  console.log('D.getReviews', getReviews);
  return getProductReview;
};

const createReviews = async (userId, contents, images, productId, rating) => {
  await AppDataSource.query(
    `
    INSERT INTO reviews (user_id, contents, images, product_id, rating) 
    VALUES (?, ?, ?, ?, ?);
  `,
    [userId, contents, images, productId, rating]
  );
};

module.exports = {
  getReviews,
  createReviews,
};
