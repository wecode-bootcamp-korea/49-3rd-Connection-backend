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

const getSellerId = async (sellerId) => {
  const [seller] = await AppDataSource.query(
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

  return seller;
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
      INSERT INTO users(
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

module.exports = {
  findById,
  findByEmail,
  getSellerId,
  signUp,
};
