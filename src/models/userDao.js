const { AppDataSource } = require('./dataSource');

const findById = async (id) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      *
    FROM
      users
    WHERE
      id = ?
    `,
    [id]
  );

  return user;
};

const findBySellerId = async (sellerId) => {
  const [user] = await AppDataSource.query(
    `
      SELECT
        *
      FROM
        users
      WHERE
        seller_id = ?
    `,
    [sellerId]
  );

  return user;
};

const findByEmail = async (email) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      *
    FROM
      users
    WHERE
      email = ?
    `,
    [email]
  );

  return user;
};

const findSeller = async (name) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      *
    FROM
      sellers
    WHERE
      name = ?
    `,
    [name]
  );

  return user;
};

const findByKakao = async (kakaoId) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      *
    FROM
      users
    WHERE
      kakao = ?
    `,
    [kakaoId]
  );

  return user;
};

const signUp = async (
  name,
  email,
  password,
  phoneNumber,
  zipCode,
  address,
  addressDetails
) => {
  await AppDataSource.query(
    `
      INSERT INTO users (
        name,
        email,
        password,
        phone_number,
        zip_code,
        address,
        address_details
      ) VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `,
    [name, email, password, phoneNumber, zipCode, address, addressDetails]
  );
};

const sellerSignUp = async (
  name,
  image,
  zipCode,
  address,
  addressDetails,
  phoneNumber,
  userId
) => {
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
        (?, ?, ?, ?, ?, ?)
    `,
    [name, image, zipCode, address, addressDetails, phoneNumber]
  );

  const sellerId = seller.insertId;

  await AppDataSource.query(
    `
      UPDATE users 
      SET 
        seller_id = ? 
      WHERE 
        id = ?
    `,
    [sellerId, userId]
  );
};

module.exports = {
  findById,
  findBySellerId,
  findByEmail,
  findSeller,
  findByKakao,
  signUp,
  sellerSignUp,
};
