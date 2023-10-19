const { productService } = require('../services');

const getProductDetail = async (req, res) => {
  try {
    const id = req.params.productId;
    const data = await productService.getProductDetail(id);

    console.log('C', data);
    return res.status(200).json({
      message: 'Success',
      product: data,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getProductDetail,
};
