const express = require('express');

const { imageUploader } = require('../middleware/imageUploader');

const testRouter = express.Router();

testRouter.post('/', imageUploader.single('image'), async (req, res) => {
  console.log(req.file);
  console.log(req.file.location);
  const data = req.body.bye;
  const jsonData = JSON.parse(data);
  console.log(JSON.stringify(jsonData));

  console.log(jsonData.hi);
  res.json({ measdas: 'tkddat' });
});

module.exports = {
  testRouter,
};
