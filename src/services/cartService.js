const { cartDao } = require('../models');
const {
  getCartDao,
  easyCheckDao,
  // makeCartDao,
  // updateQuantityDao,
  // deletCartDao,
} = cartDao;

// 장바구니 조회

const getCartService = async (userId) => {
  const cartItems = await getCartDao(userId);

  const processedCartData = [];
  cartItems.forEach((item) => {
    const existingCart = processedCartData.find(
      (cart) => cart.userId === item.user_id
    );

    if (existingCart) {
      // User cart already exists, add the product to the existing cart
      const product = {
        sellerId: item.seller_id,
        product: {
          productId: item.product_id,
          productName: item.product_name,
          quantity: item.quantity,
          productPrice: item.price,
          discountRate: item.discount_rate,
        },
      };
      existingCart.products.push(product);
    } else {
      // Create a new user cart
      const newCart = {
        userId: item.user_id,
        userName: item.user_name,
        products: [
          {
            sellerId: item.seller_id,
            product: {
              productId: item.product_id,
              productName: item.product_name,
              quantity: item.quantity,
              productPrice: item.price,
              discountRate: item.discount_rate,
            },
          },
        ],
      };
      processedCartData.push(newCart);
    }
  });

  return processedCartData;
};

// (users.id, users.name, carts.id, products.seller_id,
//products.id, products.name, carts.quantity,
//products.price, products.discount_rate)

const speedCheckService = async (userId) => {
  return await easyCheckDao(userId);
};

//장바구니 생성
// cosnt creatCartService = async (userId, productId, quantity) =>{
//   const easyCheck = easyCheckDao(userId)
//   return await MakeCartDao(userId, prodcutId, quantity)
// }

// 장바구니 제품수량 변경
// const quantityUpdateService = async (userId, productId, quantity) => {
//   const checkCart = await easyCheckDao(userId);
//   return await updateQuantityDao(quantity, cartId, productId);
// };

// 장바구니 삭제
// const removeCartService = async (userId) => {
//   const noItemCart = await easyCheckDao(userId);
//   return await deletCartDao(userId, cartId);
// };

module.exports = {
  getCartService,
  speedCheckService,
  // quantityUpdateService
  // removeCartService,
};
