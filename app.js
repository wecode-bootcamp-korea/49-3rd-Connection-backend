const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { imageUploader } = require('./src/middleware/imageUploader');
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

app.post('/test/image', imageUploader.single('image'), (req, res) => {
  return res.send('good');
});

module.exports = { createApp };
