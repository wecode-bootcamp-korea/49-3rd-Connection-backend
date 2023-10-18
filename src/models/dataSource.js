const { DataSource } = require('typeorm');

console.log('디비커넥샨', process.env.DB_CONNECTION);
const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
});

module.exports = { AppDataSource };
