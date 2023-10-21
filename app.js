const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

const { errorHandler } = require('./src/utils/errorHandler');

const { router } = require('./src/routers');

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(router);

  app.use(errorHandler);


  return app;
};

module.exports = { createApp };
