const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// require('dotenv').config();
const { router } = require('./src/routers');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('combined'));

  app.use(router);

  return app;
};

module.exports = { createApp };
