const { productDao, builder } = require('../models');

const getTotalProductByCategoryId = async () => {
  const categoryIds = await productDao.getTotalCategoryId();
  const categoryId = categoryIds.map((item) => item.id);

  let result = await Promise.all(
    categoryId.map(async (categoryId) => {
      const product = await productDao.getTotalProductByCategoryId(categoryId);
      const categoryName = await productDao.getCategoryNameById(categoryId);

      return {
        categoryId,
        categoryName: categoryName[0].category_name,
        product,
      };
    })
  );

  result = JSON.parse(JSON.stringify(result), (key, value) => {
    // 숫자로 변환 가능한 경우 숫자로 변환
    return typeof value === 'string' && !isNaN(Number(value))
      ? Number(value)
      : value;
  });

  return result;
};

const getProductRandomSellerId = async (req, res) => {
  const sellerIds = await productDao.getRandomSellerId();

  const sellerId = sellerIds.map((item) => item.id);

  let result = await Promise.all(
    sellerId.map(async (sellerId) => {
      const product = await productDao.getTotalProductBySellerId(sellerId);
      const sellerName = await productDao.getSellerNameById(sellerId);

      return {
        sellerId,
        sellerName: sellerName[0].name,
        product,
      };
    })
  );

  result = JSON.parse(JSON.stringify(result), (key, value) => {
    // 숫자로 변환 가능한 경우 숫자로 변환
    return typeof value === 'string' && !isNaN(Number(value))
      ? Number(value)
      : value;
  });
  return result;
};

module.exports = {
  getProductRandomSellerId,
  getTotalProductByCategoryId,
};
