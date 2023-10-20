const request = require('supertest'); // 실행은 npm test() --> package.json 활용

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require('../app'); //server.js에 있는 거
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const { AppDataSource } = require('../src/models/dataSource'); // 활용되는 database 말고, test로 만들어서

// 동작을 describe
describe('make order and pay', () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize();

    // 순서가 중요함 -> data 들어가는 flow 에 맞춰서
    // 하드 코딩해서 직접 값을 key에 입력해주는 것
    await AppDataSource.query(`
      SELECT points FROM users WHERE id = 1
    `);
    await AppDataSource.query(`
      SELECT product_id FROM carts WHERE user_id = 1 AND product_id = 1 
    `);
    await AppDataSource.query(`
    INSERT INTO orders ( user_id, total_price, shipping_method, payment_id)
    VALUES (1, '2000', '택배 배송', 1);
    `);
    await AppDataSource.query(`
    INSERT INTO order_details ( order_id, product_id, quantity) 
    VALUES ( 1, 1, 10);
    `);
    await AppDataSource.query(`
    UPDATE users SET points = '2000' WHERE id = 1 ;
    `);
    await AppDataSource.query(`
    DELETE FROM users WHERE user_id = 1 AND product_id = 1 ;
    `);
    await AppDataSource.query(`
    UPDATE carts SET quantity = 30 WHERE user_id = 1 AND product_id = 1 ; 
    `);
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다. -> 그래서 .env 에 test database 넣어야 함
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE reviews`);
    await AppDataSource.query(`TRUNCATE products`);
    await AppDataSource.query(`TRUNCATE product_categories`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE sellers`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test('SUCCESS: created orders ', async () => {
    const res = await request(app).post('/orders');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'message": "Created Orders 주문정보 저장" ',
      data: [
        {   
          userId: 1,
          totalPrice: "1000" , 
          shippingMethod : "방문수령",
          paymentId : 1,
          productId : 1,
          quantity : 1
      }
      ],
    });
  });

  test('SUCCESS: created ordersDetails ', async () => {
    const res = await request(app).post('/orders');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'message": "Created OrderDetails 결제 후 주문내역 저장" ',
      data: [
        {   
          userId: 1,
          totalPrice: "1000" , 
          shippingMethod : "방문수령",
          paymentId : 1,
          productId : 1,
          quantity : 1
      }
      ],
    });
  });

  test('SUCCESS: created orders ', async () => {
    const res = await request(app).get('/products/category');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'message": "Created Orders 주문정보 저장" ',
      data: [
        {   
          userId: 1,
          totalPrice: "1000" , 
          shippingMethod : "방문수령",
          paymentId : 1,
          productId : 1,
          quantity : 1
      }
      ],
    });
  });

  test('SUCCESS: created orders ', async () => {
    const res = await request(app).get('/products/category');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'message": "Created Orders 주문정보 저장" ',
      data: [
        {   
          userId: 1,
          totalPrice: "1000" , 
          shippingMethod : "방문수령",
          paymentId : 1,
          productId : 1,
          quantity : 1
      }
      ],
    });
  });
