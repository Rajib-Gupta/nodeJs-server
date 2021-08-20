const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeDetailsById= async (req, res) => {
    var id = req.params.id;
    console.log(id);
    try {
        var sql = `select e.*, CONCAT(em.f_name, ' ',em.l_name) as 'supervisor_name' from employee_master as e LEFT JOIN employee_master as em ON e.sup_id= em.emp_id where e.emp_id=${id}`;
        var rows =  await query(sql);
        employees = rows.map((emp) => {
            delete emp.password;
            return emp;
          });
        var jsonstr = JSON.stringify(employees[0]);
        res.end(jsonstr);
    } catch (error) {
      console.log(error.message);
      res.json(createError.InternalServerError());
    }
    
  };
  module.exports= {employeeDetailsById}