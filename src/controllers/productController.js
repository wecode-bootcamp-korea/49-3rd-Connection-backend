const { productService } = require('../services');

const getProducts = async (req, res) => {
  try {
    const {
      sort = 'rating',
      limit = 12,
      offset = 0,
      categoryId = 0,
      sellerId = 0,
    } = req.query;

    const filter = { category: categoryId, seller: sellerId };

    const data = await productService.getProducts(filter, sort, limit, offset);
    const name = await productService.getNameById(filter);
    return res.status(200).json({
      message: 'Success',
      name,
      data: data,
      totalQuantity: data.length,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
};
