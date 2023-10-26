const { AppDataSource } = require('./dataSource');

const createPayment = async (method, totalPrice, shippingMethod, userId) => {
  const result = await AppDataSource.transaction(async (transactionManager) => {
    try {
      const paymentMethod = await transactionManager.query(
        `
          SELECT id
            FROM payments WHERE method=?
         
        `,
        [method]
      );
      const paymentId = paymentMethod[0].id;
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
