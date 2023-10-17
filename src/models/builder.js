const { AppDataSource } = require('./dataSource');

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

module.exports = { ordering };
