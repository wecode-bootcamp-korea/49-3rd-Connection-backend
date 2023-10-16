const { AppDataSource } = require('./dataSource');

const getCategorylist = async (req, res) => {
  const products = await AppDataSource.query(
    `SELECT
    product_categories.id AS categoryId,
    product_categories.category_name AS categoryName,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', products.id,
            'name', products.name,
            'url', products.images,
            'price', products.price,
            'total_price', (products.price - (products.price * (products.discount_rate / 100))),
            'discount_rate', products.discount_rate,
            'discount_price', products.discount_price        )
    ) AS product_data
FROM products
LEFT JOIN product_categories ON products.product_category_id = product_categories.id
GROUP BY product_categories.id`
  );

  return products;
};

const getSellerlist = async (req, res) => {
  const sellerProducts = await AppDataSource.query(
    `SELECT
    sellers.id AS sellersId,
    sellers.name AS sellersname,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', products.id,
            'name', products.name,
            'url', products.images,
            'price', products.price,
            'total_price', (products.price - (products.price * (products.discount_rate / 100))),
            'discount_rate', products.discount_rate,
            'discount_price', products.discount_price        )
    ) AS product_data
FROM products
LEFT JOIN sellers ON sellers.id = products.seller_id
GROUP BY sellers.id`
  );

  return sellerProducts;
};
//   const productsList = await getCategoryList();
//   const groupedProducts = productsList.reduce((result, item) => {
//     // 이미 있는 카테고리인지 확인
//     const existingCategory = result.find(
//       (group) => group.category === item.category
//     );
//     if (!existingCategory) {
//       // 이미 있는 카테고리가 아닌 경우에만 추가
//       result.push({
//         category: item.category,
//         product_data: JSON.parse(item.product_data), // product_data를 파싱해 JSON 배열로 저장
//       });
//     }
//     return result;
//   }, []);
// };
// console.log(groupedProducts);

// const getCategorylistt = async (req, res) => {
//   const products = await AppDataSource.query(
//     `SELECT
//     product_categories.category_name AS categoryId,
//     product_categories.category_id AS categoryName
//     JSON_ARRAYAGG(
//         JSON_OBJECT(
//             'id', products.id,
//             'name', products.name,
//             'url', products.images,
//             'price', products.price,
//             'total_price', (products.price - (products.price * (products.discount_rate / 100))),
//             'discount_rate', products.discount_rate,
//             'discount_price', products.discount_price
//         )
//     ) AS product_data
// FROM products
// LEFT JOIN product_categories ON products.product_category_id = product_categories.id
// GROUP BY products.id`
//   );

//   return products;
// };

module.exports = {
  getCategorylist,
  getSellerlist,
  // groupedProducts
};
