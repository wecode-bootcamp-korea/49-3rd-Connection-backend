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
    // users 테이블 채우기
    await AppDataSource.query(`
    INSERT INTO users (name, email, password, phone_number, zip_code, address, address_details) VALUES ('ddd', '@', '111', '010', '00000', '강남구', '101동')  
    `);
    // sellers 채우기
    await AppDataSource.query(`
    INSERT INTO sellers (name, image, zip_code, address, address_details, phone_number) VALUES ('ddd', 'url', '111', '강남구', '101동 ', '010')  
    `);
    // products 테이블 채우기
    await AppDataSource.query(`
    INSERT INTO product_categories (category_name) VALUES ('뷰티') 
  `);
    // products 테이블 채우기
    await AppDataSource.query(`
    INSERT INTO products (name, images, price, product_category_id, seller_id) VALUES ('감자',"url",'1000', 1, 1) 
    `);
    // carts 채우기
    await AppDataSource.query(`
    INSERT INTO carts (user_id, product_id, quantity) VALUES (1,1,3) 
    `);
    // paymemts 채우기
    await AppDataSource.query(`
    INSERT INTO payments (method) VALUES ("s") 
    `);
  });

  afterAll(async () => {
    // truncate: 특정 테이블 비움; 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다. -> 그래서 .env 에 test database 넣어야 함
    // 위에 table들 여기에 넣음 _ 근데 flow 순서대로 userId > productId > carts> orderId 등
    await AppDataSource.query(`SET foreign_key_checks = 0;`); //외래키 비활성화
    await AppDataSource.query(`TRUNCATE payments`);
    await AppDataSource.query(`TRUNCATE carts`);
    await AppDataSource.query(`TRUNCATE products`);
    await AppDataSource.query(`TRUNCATE product_categories`);
    await AppDataSource.query(`TRUNCATE sellers`);
    await AppDataSource.query(`TRUNCATE users`);
    //   await AppDataSource.query(`SET foreign_key_checks = 1;`); // 외래키 다시 활성화

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test('SUCCESS: created orders ', async () => {
    await request(app)
      .post('/orders')
      .send({ userId: 1, totalPrice: '1000', shippingMethod: '방문수령', paymentId: 1, productId: 1, quantity: 1 });
      .expect(201);
//      expect(res.status).toBe(200);
//    expect(res.body.message).toEqual('Created Orders 주문정보 저장');
  });
}, 10000000000);
