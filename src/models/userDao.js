const { AppDataSource } = require('./dataSource');

const findUserById = async (id) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      seller_id AS sellerId
    FROM
      users
    WHERE
      id = ?
    `,
    [id]
  );

  return user;
};

const findUserByEmail = async (email) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      email,
      seller_id AS sellerId,
      password
    FROM
      users
    WHERE
      email = ?
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

module.exports = {
  findUserById,
  findUserByEmail,
  findSellerByName,
  createUser,
  createSeller,
};
