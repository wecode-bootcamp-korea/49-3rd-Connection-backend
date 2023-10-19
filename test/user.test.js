const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createApp } = require('../app');
const { AppDataSource } = require('../src/models/dataSource');

describe('Sign Up', () => {
  let app;
  beforeAll(async () => {
    app = createApp();

    await AppDataSource.initialize();
    await AppDataSource.query(
      `INSERT INTO users (
        name,
        email,
        password,
        phone_number,
        zip_code,
        address,
        address_details
        ) VALUES (
          "류제영",
          "abcd@email.com",
          "ks123456!!",
          "01012345678",
          "123456",
          "테헤란로 427",
          "10층 라운지"
      )`
    );
  });

  afterAll(async () => {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=0');
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=1');

    await AppDataSource.destroy();
  });

  test('SUCCESS : Sign Up', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: '류시헌',
        email: 'abc32d@email.com',
        password: 'ks123456!!',
        phoneNumber: '01012345678',
        zipCode: '123456',
        address: '테헤란로 427',
        addressDetails: '10층 라운지',
      })
      .expect(200);
    expect(res.body.message).toEqual('SUCCESS');
  });

  test('FAILED : key error', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: '류제영',
        password: 'ks123456!!',
        phoneNumber: '01012345678',
        zipCode: '123456',
        address: '테헤란로 427',
        addressDetails: '10층 라운지',
      })
      .expect(400);
    expect(res.body.message).toEqual('KEY_ERROR: email');
  });

  test('FAILED : invalid email', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: '류제영',
        email: 'abcdmail.com',
        password: 'ks123456!!',
        phoneNumber: '01012345678',
        zipCode: '123456',
        address: '테헤란로 427',
        addressDetails: '10층 라운지',
      })
      .expect(400);
    expect(res.body.message).toEqual('INVALID_EMAIL');
  });

  test('FAILED : invalid password', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: '류제영',
        email: 'abcd@email.com',
        password: 'ks12345',
        phoneNumber: '01012345678',
        zipCode: '123456',
        address: '테헤란로 427',
        addressDetails: '10층 라운지',
      })
      .expect(400);
    expect(res.body.message).toEqual('INVALID_PASSWORD');
  });

  test('FAILED : duplicate email', async () => {
    const res = await request(app)
      .post('/users/duplicate')
      .send({
        email: 'abcd@email.com',
        password: 'ks123456!!',
      })
      .expect(400);
    expect(res.body.message).toEqual('DUPLICATED_EMAIL_ADDRESS');
  });
});

describe('Log in', () => {
  let app;
  let bcryptPassword;
  beforeAll(async () => {
    app = createApp();

    await AppDataSource.initialize();
    bcryptPassword = await bcrypt.hash('ks123456!!', 12);
    await AppDataSource.query(
      `INSERT INTO users (
        name,
        email,
        password,
        phone_number,
        zip_code,
        address,
        address_details
        ) VALUES (
          "류제영",
          "abcd@email.com",
          "${bcryptPassword}",
          "01012345678",
          "123456",
          "테헤란로 427",
          "10층 라운지"
      )`
    );
  });

  afterAll(async () => {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=0');
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=1');

    await AppDataSource.destroy();
  });

  test('SUCCESS : Log In', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        email: 'abcd@email.com',
        password: 'ks123456!!',
      })
      .expect(200);
    expect(res.body.message).toEqual('SUCCESS');
  });

  test('FAILED : user not found', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        email: 'abc@email.com',
        password: 'ks123456!!',
      })
      .expect(400);
    expect(res.body.message).toEqual('USER_NOT_FOUND');
  });

  test('FAILED : wrong password', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        email: 'abcd@email.com',
        password: 'ks123456!',
      })
      .expect(400);
    expect(res.body.message).toEqual('WRONG_PASSWORD');
  });
});

describe('Seller Sign Up', () => {
  let app;
  let userId;
  let sellerId;
  let accessToken;

  beforeAll(async () => {
    app = createApp();

    await AppDataSource.initialize();

    const seller = await AppDataSource.query(
      `
      INSERT INTO sellers (
        name,
        image,
        zip_code,
        address,
        address_details,
        phone_number
      ) VALUES
        ("류제영", "1", "123456", "테헤란로 427", "10층 라운지", "01012345678")
      `
    );

    sellerId = seller.insertId;

    const user = await AppDataSource.query(
      `INSERT INTO users (
        name,
        email,
        password,
        phone_number,
        zip_code,
        address,
        address_details,
        seller_id
        ) VALUES (
          "정지현",
          "abcd222222@email.com",
          "ks123456!!",
          "01012345678",
          "123456",
          "테헤란로 427",
          "10층 라운지",
          ${sellerId}
      )`
    );

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    let newId;
    const newSeller = await AppDataSource.query(
      `INSERT INTO users (
        name,
        email,
        password,
        phone_number,
        zip_code,
        address,
        address_details
        ) VALUES (
          "정지현",
          "abcd2222@email.com",
          "ks123456!!",
          "01012345678",
          "123456",
          "테헤란로 427",
          "10층 라운지"
      )`
    );
    newId = newSeller.insertId;
    token = jwt.sign({ id: newId }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=0');
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE sellers`);
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS=1');

    await AppDataSource.destroy();
  });

  test('SUCCESS : Seller Sign Up', async () => {
    const res = await request(app)
      .post('/users/seller')
      .set('Authorization', token)
      .send({
        name: '차승혁',
        image: '1',
        zipCode: '123456',
        address: '테헤란로 427',
        addressDetails: '10층 라운지',
        phoneNumber: '01012345678',
      })
      .expect(200);
    expect(res.body.message).toEqual('SUCCESS');
  });

  test('FAILED : invalid name', async () => {
    const res = await request(app)
      .post('/users/seller')
      .set('Authorization', accessToken)
      .send({
        name: '류제영',
        image: '1',
        zipCode: '123456',
        address: '테헤란로 427',
        addressDetails: '10층 라운지',
        phoneNumber: '01012345678',
      })
      .expect(400);
    expect(res.body.message).toEqual('INVALID_NAME');
  });

  test('FAILED : already seller', async () => {
    const res = await request(app)
      .post('/users/seller')
      .set('Authorization', accessToken)
      .send({
        name: '류시헌',
        image: '1',
        zipCode: '123456',
        address: '테헤란로 427',
        addressDetails: '10층 라운지',
        phoneNumber: '01012345678',
      })
      .expect(400);
    expect(res.body.message).toEqual('ALREADY_SELLER');
  });
});
