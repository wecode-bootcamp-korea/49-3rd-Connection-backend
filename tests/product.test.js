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
      INSERT INTO users (id, name, email, password)
      VALUES (1, 'testUser', 'user@wecode.co.kr', 'test-password');
    `);
    await AppDataSource.query(`
      INSERT INTO posts (id, title, content, user_id)
      VALUES (1, 'testTitle', 'testContent', 1);
    `);
  });

  afterEach(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE posts`);
    await AppDataSource.query(`TRUNCATE users`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test('SUCCESS: get posts', async () => {
    const res = await request(app).get('/posts/').send();
    expect(res.body).toEqual({
      postData: [
        {
          content: 'testContent',
          id: 1,
          title: 'testTitle',
          user_id: 1,
        },
      ],
    });
  });
});
