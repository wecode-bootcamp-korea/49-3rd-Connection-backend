const { AppDataSource } = require('./dataSource');

const getReviews = async (productId) => {
  const getProductReview = await AppDataSource.query(
    `SELECT
      reviews.id AS reviewId,
      users.email AS email,
      reviews.contents AS contents,
      reviews.images AS reviewImages,
      reviews.rating AS rating,
      reviews.user_id AS userId,
      reviews.product_id AS productId,
      reviews.created_at AS date
    FROM reviews
    LEFT JOIN products ON products.id = reviews.product_id
    LEFT JOIN users ON users.id = reviews.user_id
    WHERE reviews.product_id = ?
  `,
    [productId]
  );
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
