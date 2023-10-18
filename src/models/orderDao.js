const { AppDataSource } = require('./dataSource.js');

const createOrders = async (
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
  orderId,
  productId,
  quantity) => {
  // 1) orders table 주문 정보 저장
  const newOrder = await AppDataSource.query(`
    INSERT INTO 
      orders(
        total_price, 
        shipping_method, 
        payment_id
        ) 
    VALUES (
      '${totalPrice}', 
      '${shippingMethod}', 
      '${paymentId}'
    ) 
    `);
  return newOrder.insert.id;  //.insert.id 하면 자동으로 order_id 뽑아줌 
};

  // 2) orderDetails table 주문 정보 저장
  const neworderDetails = await AppDataSource.query(`
    INSERT INTO 
      order_details(
        order_id,
        product_id, quantity
        ) 
    VALUES (
      "${orderId} ", 
      "${productId}", 
      "${quantity}" 
      ) 
      `);
  return neworderDetails;
};

delete cart WHERE userId and productID and qauntity 

  // 3) carts 에서 삭제

module.exports = {
  createOrders,
};
