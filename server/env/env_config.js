// config.js
// .env deve está na pasta raiz
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  API_SECRET: process.env.API_SECRET,
  PORT: process.env.PORT,
};
