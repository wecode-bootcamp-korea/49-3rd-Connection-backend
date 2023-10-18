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

const selectQueryWithCategory = async () => {
  return `, product_categories.category_name`;
};

const selectQueryWithSeller = async () => {
  return `, sellers.name`;
};

const joinQueryWithCategory = async () => {
  return `
    LEFT JOIN product_categories 
    ON products.product_category_id = product_categories.id
  `;
};

const joinQueryWithSeller = async () => {
  return `
    LEFT JOIN sellers
    ON products.seller_id = sellers.id
  `;
};

const whereQueryWithCategory = async (categoryId) => {
  return `AND products.product_category_id=${categoryId}`;
};

const whereQueryWithSeller = async (sellerId) => {
  return `AND products.seller_id=${sellerId}`;
};

const limitOffsetQuery = async (limit, offset) => {
  let query = ``;
  if (limit) query += `LIMIT ${limit}`;
  if (offset) query += `OFFSET ${offset}`;
  return query;
};

module.exports = {
  ordering,
  selectQueryWithCategory,
  selectQueryWithSeller,
  joinQueryWithCategory,
  joinQueryWithSeller,
  whereQueryWithCategory,
  whereQueryWithSeller,
  limitOffsetQuery,
};
