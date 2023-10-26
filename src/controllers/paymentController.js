const { paymentService } = require('../services');
const { keyCheck } = require('../utils/keyCheck');

const getPayment = async (req, res) => {
  try {
    const { totalPrice, shippingMethod, products, course = '' } = req.body;
    console.log(
      '컨트롤러에서 제품 정보가 res에 있는지 확인:',
      totalPrice,
      shippingMethod,
      products,
      course
    );
    const userId = req.userId;

    const { imp_uid } = req.body;
    keyCheck({
      imp_uid,
    });

    const getpaymentValid = await paymentService.createPayment(imp_uid, userId);
    const cart = await paymentService.updateCart(userId, products, course);

    console.log(cart);

    if (getpaymentValid) {
      res
        .status(200)
        .json({ message: 'PAYMENT_SUCCESS', cartQuantity: cart.quantity });
    }
  } catch (error) {
    console.error();
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPayment,
};
