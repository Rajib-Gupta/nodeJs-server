const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeDelete = async (req, res) => {
    var id = req.params.id;
    console.log("test");
    console.log(req.body);
    try {
        var sql = `DELETE FROM employee_master where emp_id=${id} `;
        var rows =  await query(sql);
        console.log("Connected!");
        console.log(rows);
        res.end('{"res":"Delete"}');
    } catch (error) {
        console.log(error.message);
        res.json(createError.InternalServerError());
    }
  
  }

  module.exports={employeeDelete}