const { productService } = require('../services');

// "categoryId": 1,
// "categoryName": "푸드",
// "products": [
//   {
//     "productId": 1,
//     "productName": "상품 A",
//     "productImage": "/images/products/beef.png",
//     "originalPrice": 10000,
//     "totalPrice": 9900,
//     "rating": 4.5

// const getSellerProduct = async (req, res) => {
//   try {
//     const sellers = await productsService.getSellerById(sellersId); // 판매자 정보
//     const products = await productService.getSellerProduct(sellersId); // 판매자 제품 목록

//     // const getSellerProductlist = {
//     //   sellers: {
//     //     id: sellers.id,
//     //     name: sellers.name,
//     //   },

//     //   // products: products.map((products) => ({
//       //   id: products.id,
//       //   name: products.name,
//       //   image: products.image,
//       //   price: products.price,
//       //   discount_rate: products.discount_rate,
//       //   discount_price: products.discount_price,
//       //   total_price:
//       //     products.price - products.price * (products.discount_rate / 100),
//       //   rating: reviews.rating, //제품 평점
//       // })),
//     // };

//     res.status(200).json();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Seller's products not found" });
//   }
// };

const getCategoryProduct = async (req, res) => {
  try {
    // const product_categories = await productService.getCategoryById(categoryId); // 카테고리 정보
    const products = await productService.getCategoryProduct(); // 카테고리의 제품 목록

    return res.status(200).json({
      product: products,
    }); //
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Category's products are not found" });
  }
};

// name,images,price,discount_rate,discount_price,priduct_category_id
// userId: 사용자 ID
// category: 제품 카테고리
// sort: 제품 정렬 방식
// product_type: 제품 유형
// offset: 결과 목록에서 시작할 위치
// limit: 가져올 결과 수

module.exports = {
  // getSellerProduct,
  getCategoryProduct,
};
