const { productService } = require('../services');

const getProducts = async (req, res) => {
  try {
    const { sort = 'rating', limit = 12, offset = 0 } = req.query;
    const { categoryId, sellerId } = req.query;

    const filter = { category: categoryId, seller: sellerId };

    const data = await productService.getProducts(filter, sort, limit, offset);
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
    const { categoryId } = req.query;
    const { sellerId } = req.params;

    console.log('셀러 아이디 in controller: ', sellerId);

    const filter = { category: categoryId, seller: sellerId };
    const data = await productService.getProductBySellerId(
      filter,
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
  getProducts,
  getProductBySellerId,
};
