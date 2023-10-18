const { AppDataSource } = require('./dataSource.js');

const createOrders = async (totalPrice, shippingMethod, paymentId) => {
  const newOrder = await myDataSource.query(`
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
  return newOrder;
};

const createOrderDetails = async (productId, quantity) => {
  const neworderDetails = await myDataSource.query(`
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

module.exports = {
  createOrders,
  createOrderDetails,
};
