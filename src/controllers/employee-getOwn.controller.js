const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeGetOwnKpi= async (req, res) => {
    var id = req.params.id;
    console.log(id);
    try {
        var sql = `SELECT em.*, kp.feedback_emp_id FROM employee_kpi as kp RIGHT JOIN employee_master as em on kp.feedback_emp_id="${id}" and kp.emp_id="${id}" where em.emp_id="${id}"`;
        var rows =  await query(sql);
        res.json(rows);
    } catch (error) {
      console.log(error.message);
      res.json(createError.InternalServerError());
    }
    
  };
  module.exports= {employeeGetOwnKpi}