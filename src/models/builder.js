// LEFT JOIN product_categories ON products.product_category_id = product_categories.idconst { AppDataSource } = require('./dataSource');

const ordering = async (sort) => {
  switch (sort) {
    case 'rating':
      return ` ORDER BY rating DESC, products.id ASC`;
    case 'review':
      return ` ORDER BY reviewNumber DESC, products.id ASC`;
    case 'created_at':
      return ` ORDER BY products.created_at DESC, products.id ASC`;
    default:
      return ` ORDER BY rating DESC, products.id ASC`;
  }
};

const joinQuery = async () => {
  return ` LEFT JOIN product_categories ON products.product_category_id = product_categories.id `;
};

const whereQueryWithCategory = async (categoryId) => {
  return `AND products.product_category_id=${categoryId}`;
};

const whereQueryWithSeller = async (sellerId) => {
  console.log('쎌러 아이디: ', sellerId);
  return `AND products.seller_id=${sellerId}`;
};

const limitOffsetQuery = async (limit, offset) => {
  return `LIMIT ${limit} OFFSET ${offset}`;
};

module.exports = {
  ordering,
  joinQuery,
  whereQueryWithCategory,
  whereQueryWithSeller,
  limitOffsetQuery,
};
