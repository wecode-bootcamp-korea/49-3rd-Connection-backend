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

      // 트랜잭션 내에서 모든 쿼리가 성공적으로 실행되었을 때 "result" 변수에 어떤 값을 할당할 수도 있습니다.
      return ordersresult;
    } catch (error) {
      // 에러 처리 로직
      throw error; // 에러를 상위로 다시 던지거나 적절하게 처리
    }
  });
  console.log('result', result);
  return result; // 여기서도 "result"를 반환
};

module.exports = {
  createPayment,
};
