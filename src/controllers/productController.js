const { productService } = require('../services');

const getProductByCategoryId = async (req, res) => {
  try {
    const { sort = 'rating', limit = 12, offset = 0 } = req.query;
    const { categoryId } = req.params;
    const data = await productService.getProductByCategoryId(
      categoryId,
      sort,
      limit,
      offset
    );
    const name = await productService.getCategoryNameById(categoryId);

    return res.status(200).json({
      message: 'Success',
      categoryName: name[0].category_name,
      data: data,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

const getProductBySellerId = async (req, res) => {
  try {
    const { sort = 'rating', limit = 12, offset = 0 } = req.query;
    const { sellerId } = req.params;
    const data = await productService.getProductBySellerId(
      sellerId,
      sort,
      limit,
      offset
    );

    const name = await productService.getSellerNameById(sellerId);
    return res.status(200).json({
      message: 'Success',
      sellerName: name[0].name,
      data: data,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getProductByCategoryId,
  getProductBySellerId,
};
