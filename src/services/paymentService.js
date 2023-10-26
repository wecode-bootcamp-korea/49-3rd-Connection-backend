const { paymentDao, productDao } = require('../models');
const axios = require('axios');
const { throwError } = require('../utils/throwError');

const createPayment = async (imp_uid, userId) => {
  const getToken = await axios({
    url: 'https://api.iamport.kr/users/getToken',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      imp_key: process.env.IMP_KEY,
      imp_secret: process.env.IMP_SECRET,
    },
  });

  const { access_token } = getToken.data.response;
  if (!access_token) throwError(408, 'FAIL_TO_GET_TOKEN');

  const getPaymentInfo = await axios({
    url: `https://api.iamport.kr/payments/${imp_uid}`,
    method: 'GET',
    headers: { Authorization: access_token },
  });

  console.log('@@@@@@@@@@@:', getPaymentInfo.data.response);
  const { pg_provider, name, amount } = getPaymentInfo.data.response;
  if (!amount && !pg_provider && !name)
    throwError(400, 'FAIL_TO_GET_PAYMENT_RESPONSE');

  const shippingMethod = 'delivery';

  const result = await paymentDao.createPayment(
    pg_provider,
    amount,
    shippingMethod,
    userId
  );
  console.log('serviceresult', result);
  return result;
};

module.exports = {
  createPayment,
};
