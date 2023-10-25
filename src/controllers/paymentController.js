const { paymentService } = require('../services');
const { keyCheck } = require('../utils/keyCheck');

const getPayment = async (req, res) => {
  try {
    const userId = req.userId;

    const { imp_uid } = req.body;
    keyCheck({
      imp_uid,
    });

    const getpaymentValid = await paymentService.createPayment(imp_uid, userId);

    if (getpaymentValid) {
      res.status(200).json({ message: 'PAYMENT_SUCCESS' });
    }
  } catch (error) {
    console.error();
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPayment,
};
