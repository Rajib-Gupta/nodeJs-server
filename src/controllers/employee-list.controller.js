const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeList = async (req, res) => {
  try {
    const sql = `SELECT e.*, AVG( kp.availability + kp.ontime + kp.punctuality + kp.regularity + kp.timetorepair + kp.criticalproblemsolving + kp.clienthandling + kp.innovative + kp.teamPlayer + kp.dependibility ) AS 'average', CONCAT(m.f_name, ' ', m.l_name) AS 'supervisor_name' FROM employee_master AS e LEFT JOIN employee_master AS m ON e.sup_id = m.emp_id LEFT JOIN employee_kpi AS kp ON kp.emp_id = e.emp_id GROUP BY e.emp_id`;
    const rows = await query(sql);
    var jsonstr = JSON.stringify(rows);
    res.end(jsonstr);
  } catch (error) {
    console.log(error.message);
    res.json(createError.InternalServerError());
  }
};


module.exports = { employeeList };
