require('dotenv').config();

const { createApp } = require('./app');
const { AppDataSource } = require('./src/models/datasource');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await AppDataSource.initialize();

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
