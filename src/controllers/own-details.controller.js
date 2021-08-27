const createError = require("http-errors");
const { query } = require("../database/connection");

exports.ownDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `Select * from employee_master where emp_id=${id}`;
    const rows = await query(sql);
    console.log(rows);
     //var {password,...details} = rows.length ? { ...rows[0] } : {};
     employees = rows.map((emp) => {
       delete emp.password;
       return emp;
     });
    var jsonstr = JSON.stringify(employees[0]);
    res.status(200).end(jsonstr);
  } catch (error) {
    console.log(error);
    res.json(createError.BadRequest());
  }
};
