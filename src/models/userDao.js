const { AppDataSource } = require('./dataSource');

const findUserById = async (id) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      zip_code AS zipCode,
      seller_id AS sellerId
    FROM
      users
    WHERE
      id = ?
    LIMIT 1
    `,
    [id]
  );

  return user;
};

const findUserByEmail = async (email) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      id,
      kakao,
      email,
      seller_id AS sellerId,
      password,
      zip_code AS zipCode,
      points
    FROM
      users
    WHERE
      email = ?
    LIMIT 1
    `,
    [email]
  );

  return user;
};

const findSellerByName = async (name) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      name
    FROM
      sellers
    WHERE
      name = ?
    LIMIT 1
    `,
    [name]
  );

  return user;
};

const createUser = async (
  name,
  email,
  password,
  phoneNumber,
  zipCode,
  address,
  addressDetails,
  points,
  paymentId,
  price
) => {
  await AppDataSource.transaction(async (transactionManager) => {
    const insertUser = await transactionManager.query(
      `
        INSERT INTO users (
          name,
          email,
          password,
          phone_number,
          zip_code,
          address,
          address_details,
          points
        ) VALUES
          (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        email,
        password,
        phoneNumber,
        zipCode,
        address,
        addressDetails,
        points,
      ]
    );
    const userId = insertUser.insertId;
    await transactionManager.query(
      `
        INSERT INTO user_premium (
          user_id,
          payment_id,
          price
        ) VALUES
          (?, ?, ?)
      `,
      [userId, paymentId, price]
    );
  });
};

const createSeller = async (
  name,
  image,
  zipCode,
  address,
  addressDetails,
  phoneNumber,
  userId
) => {
  await AppDataSource.transaction(async (transactionManager) => {
    const seller = await transactionManager.query(
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

    await transactionManager.query(
      `
        UPDATE users 
        SET 
          seller_id = ? 
        WHERE 
          id = ?
      `,
      [sellerId, userId]
    );
  });
};

const kakaoSignIn = async (kakaoId, name, email, points, paymentId, price) => {
  let userId;
  await AppDataSource.transaction(async (transactionManager) => {
    const user = await transactionManager.query(
      `
      INSERT INTO users (
        kakao,
        name,
        email,
        points
      ) VALUES (?, ?, ?, ?)
    `,
      [kakaoId, name, email, points]
    );
    userId = user.insertId;

    await transactionManager.query(
      `
      INSERT INTO user_premium (
        user_id,
        payment_id,
        price
      ) VALUES
        (?, ?, ?)
      `,
      [userId, paymentId, price]
    );
  });

  return userId;
};

const insertAddress = async (
  phoneNumber,
  zipCode,
  address,
  addressDetails,
  userId
) => {
  await transactionManager.query(
    `
      UPDATE users
      SET
        phone_number = ?,
        zip_code = ?,
        address = ?,
        address_details = ?
      WHERE
        id = ?
    `,
    [phoneNumber, zipCode, address, addressDetails, userId]
  );
};

const findUserByKakao = async (kakao) => {
  const [user] = await AppDataSource.query(
    `
      SELECT
        kakao,
        seller_id AS sellerId,
        zip_code AS zipCode,
        points
      FROM
        users
      WHERE
        kakao = ?
      LIMIT 1
    `,
    [kakao]
  );

  return user;
};

const findUserByPremiumId = async (userId) => {
  const [user] = await AppDataSource.query(
    `
      SELECT
        user_id AS userId
      FROM
        user_premium
      WHERE
        user_id = ?
      LIMIT 1
    `,
    [userId]
  );

  return user;
};

const findUserBySellerId = async (sellerId) => {
  const [user] = await AppDataSource.query(
    `
      SELECT
        user_id AS userId
      FROM
        users
      WHERE 
        seller_id = ?
      LIMIT 1
    `,
    [sellerId]
  );

  return user;
};

const countCart = async (userId) => {
  const [user] = await AppDataSource.query(
    `
      SELECT
        SUM(quantity) AS quantity
      FROM
        carts
      WHERE
        user_id = ?
    `,
    [userId]
  );

  return user;
};

module.exports = {
  findUserById,
  findUserByEmail,
  findSellerByName,
  createUser,
  createSeller,
  kakaoSignIn,
  insertAddress,
  findUserByKakao,
  findUserByPremiumId,
  findUserBySellerId,
  countCart,
};
