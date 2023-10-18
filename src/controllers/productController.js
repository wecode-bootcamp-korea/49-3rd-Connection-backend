const { productService } = require('../services');

const getProducts = async (req, res) => {
  try {
    const {
      sort = 'rating',
      limit = 12,
      offset = 0,
      categoryId,
      sellerId,
    } = req.query;

    const filter = { category: categoryId, seller: sellerId };

    const data = await productService.getProducts(filter, sort, limit, offset);

    return res.status(200).json({
      message: 'Success',
      sellerName: data[0].seller_name,
      categoryName: data[0].category_name,
      data: data,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
};
