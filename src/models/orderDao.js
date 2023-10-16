const { AppDataSource } = require('./dataSource.js');

const B = async () => {
  const A = await myDataSource.query(`

  `);
  return A;
};

module.exports = {
  B,
};
