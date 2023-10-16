const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { router } = require('./src/routers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use(router);

app.get('/', async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to Team2's server!" });
  } catch (err) {
    console.log(err);
  }
});
const server = http.createServer(app);
const portNumber = process.env.PORT || 8000;
const start = async () => {
  try {
    server.listen(portNumber);
    console.log(`Server is listening on ${portNumber}`);
  } catch (err) {
    console.error(err);
  }
};
start();

module.exports = { app };
