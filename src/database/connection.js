const mysql = require("mysql2");
const appSettings=require('../config/appSetting')
const { promisify } = require("util");


const connection = mysql.createConnection({
  host: appSettings.Mysql.HOST,
  user: appSettings.Mysql.USER,
  password:appSettings.Mysql.PASSWORD,
  database: appSettings.Mysql.DB,
  port: appSettings.Mysql.PORT,
});
const query = promisify(connection.query).bind(connection);

module.exports = { query };
