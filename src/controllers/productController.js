const { productService } = require('../services');

const getProductDetail = async (req, res) => {
  try {
    const Detailproducts = await productService.getProductDetail();

    return res.status(200).json({
      product: Detailproducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "detail's products are not found" });
  }
};

module.exports = {
  getProductDetail,
};
