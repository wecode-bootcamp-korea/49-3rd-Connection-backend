const request = require('supertest');

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require('../app');
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const { AppDataSource } = require('../src/models/dataSource');

describe('get product', () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize();
    await AppDataSource.query(`
    INSERT INTO sellers ( name, image, zip_code, address, address_details, phone_number )
    VALUES ( 'test', 'image', 'test-zipcode', 'test-address', 'test-address_details', 'test-number' );
    `);
    await AppDataSource.query(`
      INSERT INTO users ( name, email, password, phone_number, zip_code, address, address_details, seller_id)
      VALUES ( 'testUser', 'user@wecode.co.kr', 'test-password', 'test-number', 'test-zipcode', 'test-address', 'test-address_details', 1);
    `);
    await AppDataSource.query(`
    INSERT INTO product_categories ( category_name)
    VALUES ( 'test-category' );
    `);
    await AppDataSource.query(`
    INSERT INTO products ( name, images, price, discount_rate, product_category_id, seller_id )
    VALUES ( 'test-product', 'image', 20000, 10, 1, 1);
    `);
    await AppDataSource.query(`
    INSERT INTO reviews ( contents, images, rating, user_id, product_id)
    VALUES ( 'test-product', 'test-image', 2, 1, 1);
    `);
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE reviews`);
    await AppDataSource.query(`TRUNCATE products`);
    await AppDataSource.query(`TRUNCATE product_categories`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE sellers`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test('SUCCESS: get list by sellerId 1', async () => {
    const res = await request(app).get('/products/seller/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Success');
  });

  test('SUCCESS: get list by categoryId 1', async () => {
    const res = await request(app).get('/products/?categoryId=1');
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Success');
  });
});
