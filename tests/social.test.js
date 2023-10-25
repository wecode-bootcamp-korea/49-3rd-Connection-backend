const request = require('supertest');
const jwt = require('jsonwebtoken');
const { createApp } = require('../app');
const { AppDataSource } = require('../src/models/dataSource');
const axios = require('axios');
jest.mock('axios');

describe('Social Login', () => {
  let app;
  const kakaoToken = 'mockedToken';

  beforeAll(async () => {
    app = createApp();

    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);

    await AppDataSource.destroy();
  });

  test('SUCCESS: Kakao Sign In', async () => {
    axios.post.mockResolvedValue({
      data: {
        access_token: kakaoToken,
      },
    });

    axios.get.mockResolvedValue({
      data: {
        id: 123456,
        properties: {
          nickname: '박준우',
        },
        kakao_account: {
          email: 'aaaa@naver.com',
        },
      },
    });

    const res = await request(app)
      .get('/users/kakao/callback')
      .query({
        code: 'testcode',
      })
      .expect(200);
    expect(res.body.message).toEqual('SUCCESS');
  });
});

describe('Insert Address', () => {
  let app;
  let userOneId;
  let userTwoId;
  let token;
  beforeAll(async () => {
    app = createApp();

    await AppDataSource.initialize();
    const userOne = await AppDataSource.query(
      `
      INSERT INTO users (
        kakao,
        name,
        email
      ) VALUES (
        '123456', 
        '박준우', 
        'aaaa@naver.com'
      )
      `
    );
    userOneId = userOne.insertId;

    const userTwo = await AppDataSource.query(
      `
      INSERT INTO users (
        kakao,
        name,
        email,
        phone_number,
        zip_code,
        address,
        address_details
      ) VALUES (
        '123456', 
        '차승혁', 
        'aaaaa@naver.com',
        '01012345678',
        '123456',
        '선릉역',
        '10번출구'
      )
      `
    );
    userTwoId = userTwo.insertId;
  });

  afterAll(async () => {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=0');
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=1');

    await AppDataSource.destroy();
  });

  test('SUCCESS : Insert Address', async () => {
    token = jwt.sign({ id: userOneId }, process.env.JWT_SECRET);

    const res = await request(app)
      .put('/users/kakao/address')
      .set('Authorization', token)
      .send({
        phoneNumber: '01012345678',
        zipCode: '1234567',
        address: '선릉역',
        addressDetails: '10번출구',
      })
      .expect(200);
    expect(res.body.message).toEqual('SUCCESS');
  });

  test('FAILED : ALREADY USER', async () => {
    token = jwt.sign({ id: userTwoId }, process.env.JWT_SECRET);

    const res = await request(app)
      .put('/users/kakao/address')
      .set('Authorization', token)
      .send({
        phoneNumber: '01012345678',
        zipCode: '1234567',
        address: '선릉역',
        addressDetails: '10번출구',
      })
      .expect(409);
    expect(res.body.message).toEqual('ALREADY');
  });
});
