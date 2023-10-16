const express = require('express');
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

module.exports = { app };
