const { createApp } = require('./app');

const portNumber = process.env.PORT || 8000;
const start = async () => {
  try {
    const server = createApp();
    server.listen(portNumber);
    console.log(`Server is listening on ${portNumber}`);
  } catch (err) {
    console.error(err);
  }
};
start();
