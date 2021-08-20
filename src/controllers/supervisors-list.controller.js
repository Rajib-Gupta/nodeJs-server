const createError = require("http-errors");
const { query } = require("../database/connection");

const supervisors = async (req, res) => {
  try {
    var sql = "SELECT * FROM employee_master where role=0 ";
    const rows = await query(sql);
    console.log(rows);
    var jsonstr = JSON.stringify(rows);
    if(!jsonstr){
     return res.json(createError.InternalServerError());
    }
    res.end(jsonstr);
  } catch (error) {
    console.log(error.message);
    res.json(createError.InternalServerError());
  }
};

module.exports = { supervisors};
