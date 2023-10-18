const { AppDataSource } = require('./dataSource.js');

const createOrders = async (totalPrice, shippingMethod, paymentId) => {
  const orderInformation = await myDataSource.query(`
    INSERT INTO 
      orders(
        total price, 
        shipping_method, 
        payment_id
    ) 
    VALUES (
      '${totalPrice}', 
      '${shippingMethod}', 
      '${paymentId}'
    ) 
    `);
  return orderInformation;
};

module.exports = {
  createOrders,
};
