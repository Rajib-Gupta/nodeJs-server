const mysql = require("mysql2");
const { promisify } = require("util");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee",
  port: 3307,
});
const query = promisify(connection.query).bind(connection);

module.exports = { query };
