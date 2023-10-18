const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const cartRouter = require('./src/routers');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('combined'));

  app.use(cartRouter);

  return app;
};

module.exports = { createApp };
