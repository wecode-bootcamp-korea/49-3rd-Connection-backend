const request = require('supertest');
const jwt = require('jsonwebtoken');
const { createApp } = require('../app');
const { AppDataSource } = require('../src/models/dataSource');
const axios = require('axios');
jest.mock('axios');

describe('Social Login', () => {
  let app;
  let kakaoToken = 'token_1';

  beforeAll(async () => {
    app = createApp();

    await AppDataSource.initialize();
    await AppDataSource.query(
      `
      INSERT INTO users (
        kakao,
        name,
        email
      ) VALUES (
        123456, 
        "박준우",
        "aaaa@gmail.com"
      )`
    );
  });

  afterAll(async () => {
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
    await AppDataSource.destroy();
  });

  test('SUCCESS: Kakao Sign In', async () => {
    axios.get = jest.fn().mockReturnValue({
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

    await request(app)
      .post('https://kapi.kakao.com/v2/user/me')
      .set({
        Authorization: `Bearer ${kakaoToken}`,
      })
      .expect(200);
    expect(res.body.message).toEqual('SUCCESS');
  });
});
