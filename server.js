require('dotenv').config();

const { createApp } = require('./app');
const { AppDataSource } = require('./src/models/dataSource');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await AppDataSource.initialize().then();

  app.get('/', async (req, res) => {
    try {
      return res.status(200).json({ message: "Welcome to Team2's server!" });
    } catch (err) {
      console.log(err);
    }
  });

  app.listen(PORT || 8000, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
