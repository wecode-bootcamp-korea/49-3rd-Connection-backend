const http = require('http');
const { app } = require('./app');

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
