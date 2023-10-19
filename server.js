require('dotenv').config();

const { createApp } = require('./app');
const { AppDataSource } = require('./src/models/dataSource');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;
  console.log('hi', PORT);
  await AppDataSource.initialize().then();

  app.listen(PORT || 8000, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
