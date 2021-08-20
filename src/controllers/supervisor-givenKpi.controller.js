const createError = require("http-errors");
const { query } = require("../database/connection");

const supervisorGivenKpi= async (req, res) => {
    var id = req.params.id;
    console.log(id);
    try {
      var sql = 
      `SELECT e.*, CONCAT(em.f_name," ",em.l_name) as 'Feedback_given_employee_name' FROM employee_kpi as e INNER JOIN employee_master  as em on e.sup_id=e.feedback_emp_id and em.emp_id=e.sup_id where e.emp_id=${id}`;
      var rows =  await query(sql);
        employees = rows.map((emp) => {
          delete emp.password;
          return emp;
        });
        res.json({ employees });
    } catch (error) {
      console.log(error.message);
      res.json(createError.InternalServerError());
    }
    
  };
  module.exports= {supervisorGivenKpi}