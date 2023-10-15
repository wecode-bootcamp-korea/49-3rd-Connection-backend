const { AppDataSource } = require('./dataSource');

const getCategorylist = async (req, res) => {
  const products = await AppDataSource.query(
    `SELECT 
    product_categories.category_name AS category,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', products.id,
            'name', products.name,
            'url', products.images,
            'price', products.price,
            'discount_rate', products.discount_rate,
            'discount_price', products.discount_price,
            'total_price', (products.price - (products.price * (products.discount_rate / 100)))
        )
    ) AS product_data
FROM products
LEFT JOIN product_categories ON products.product_category_id = product_categories.id
GROUP BY products.id`
  );

  //   `SELETE

  return products;
};

module.exports = {
  getCategorylist,
};
