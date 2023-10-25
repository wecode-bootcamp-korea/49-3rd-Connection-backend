const { AppDataSource } = require('./dataSource');

const createPayment = async (method, totalPrice, shippingMethod, userId) => {
  const result = await AppDataSource.transaction(async (transactionManager) => {
    try {
      const paymentMethod = await transactionManager.query(
        `
          INSERT INTO payments(
            method
          )
          VALUES (?)
        `,
        [method]
      );
      const paymentId = paymentMethod.insertId;
      console.log('paymentId', paymentId);

      const ordersresult = await transactionManager.query(
        `
          INSERT INTO orders(
            total_price,
            shipping_method,
            user_id,
            payment_id
          ) VALUES (?, ?, ?, ?)
        `,
        [totalPrice, shippingMethod, userId, paymentId]
      );
      console.log('ordersresult', ordersresult);

      return ordersresult;
    } catch (error) {
      throw error;
    }
  });
  console.log('result', result);
  return result;
};

module.exports = {
  createPayment,
};
