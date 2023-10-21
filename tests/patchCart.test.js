const request = require('supertest');

const { createApp } = require('../app');
const { AppDataSource } = require('../src/models/dataSource');

describe('patch cartItem', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    await AppDataSource.query(`
    INSERT INTO users (id, name, email, password, phone_number, zip_code, address, address_details)
    VALUES (1, 'soonhyung', 'soonhyung@naver.com', '123456', '01023456789', '4567', 'address', 'address_details'); 
    `);
    await AppDataSource.query(`
    INSERT INTO sellers (id, name, image , zip_code, address, address_details, phone_number)
    VALUES (1, 'soonwoo', '541326' , '1665' , 'address', 'address_details', '01012345678');
    `);
    await AppDataSource.query(`
    INSERT INTO users (id, name, email, password, phone_number, zip_code, address, address_details, seller_id)
    VALUES (2, 'soonwoo', 'soonwoo@naver.com', '123456', '01023456789', '4567', 'address', 'address_details',1);
    `);
    await AppDataSource.query(`
    INSERT INTO sellers (id, name, image , zip_code, address, address_details, phone_number)
    VALUES (2, 'byungwoo', '541326' , '1665' , 'address', 'address_details', '01012345678');
    `);
    await AppDataSource.query(`
    INSERT INTO users (id, name, email, password, phone_number, zip_code, address, address_details, seller_id)
    VALUES (3, 'byungwoo', 'byungwoo@naver.com', '123456', '01023456789', '4567', 'address', 'address_details',2);    
    `);
    await AppDataSource.query(`
    INSERT INTO product_categories (id, category_name)
    VALUES (1, '푸드');
    `);
    await AppDataSource.query(`
    INSERT INTO product_categories (id, category_name)
    VALUES (2, '디지털');
    `);

    await AppDataSource.query(`
    INSERT INTO products (id, name, images, price, discount_rate, product_category_id, seller_id)
    VALUES (1, '떡꼬치', '4626151', 2000, 5, 1, 1);
    `);

    await AppDataSource.query(`
    INSERT INTO products (id, name, images, price, discount_rate, product_category_id, seller_id)
    VALUES (2, '강낭콩', '4626151', 1000, 5, 1, 1);;
    `);

    await AppDataSource.query(`
    INSERT INTO products (id, name, images, price, discount_rate, product_category_id, seller_id)
    VALUES (3, '카메라', '4626151', 200000, 15, 2, 2);
    `);

    await AppDataSource.query(`
    INSERT INTO carts (id, user_id, product_id, quantity)
    VALUES (1, 1, 1, 1);
    `);
    await AppDataSource.query(`
    INSERT INTO carts (id, user_id, product_id, quantity)
    VALUES (2, 1, 2, 2);
    `);
    await AppDataSource.query(`
    INSERT INTO carts (id, user_id, product_id, quantity)
    VALUES (3, 1, 3, 1);
    `);
  });
  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE users;`);
    await AppDataSource.query(`TRUNCATE sellers;`);
    await AppDataSource.query(`TRUNCATE product_categories;`);
    await AppDataSource.query(`TRUNCATE products;`);
    await AppDataSource.query(`TRUNCATE carts;`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test('FAILED: get carts', async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .patch('/carts') // HTTP Method, 엔드포인트 주소를 작성합니다.
      .send({
        data: [
          {
            productId: 1,
            quantity: 5,
          },
          {
            productId: 2,
            quantity: 30,
          },
        ],
      })
      .expect(400) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({ message: error.message });
  });
  test('SUCCESS: patch carts', async () => {
    const res = await request(app).get('/carts').send();
    expect(res.body).toEqual({
      message: 'Update Success!',
      data: [
        {
          productId: 1,
          quantity: 5,
        },
        {
          productId: 2,
          quantity: 30,
        }
      ];
    })
  })})