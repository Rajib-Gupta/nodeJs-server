const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeUnderSuper= async (req, res) => {
    var email = req.body.email;
    try {
      var sql = `
      SELECT kp.sup_id,kp.feedback_emp_id, em.* FROM employee_master as e LEFT JOIN employee_master as em on em.sup_id = e.emp_id and e.emp_id!=em.emp_id LEFT JOIN employee_kpi as kp on kp.emp_id = em.emp_id and kp.emp_id != kp.feedback_emp_id where e.email="${email}" and em.emp_id is not null`;
      var rows =  await query(sql);
      var jsonstr = JSON.stringify(rows);
      res.end(jsonstr);
    } catch (error) {
      console.log(error.message);
      res.json(createError.InternalServerError());
    }
    
  };
  module.exports= {employeeUnderSuper}