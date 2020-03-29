var mysql = require('mysql');
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = require("./../config/env.config.js");

module.exports = mysql.createConnection({
  host     : DB_HOST,
  port     : DB_PORT,
  user     : DB_USER,
  password : DB_PASS,
  database : DB_NAME
});