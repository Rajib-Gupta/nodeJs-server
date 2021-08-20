const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeAvgKpi = async (req, res) => {
    var id = req.params.id;
    console.log(id);
  
  try {
    var sql = `
    SELECT avg(feedback_emp_id+availability+ontime+punctuality+regularity+timetorepair+criticalproblemsolving+clienthandling+innovative+teamPlayer+dependibility) as 'average' FROM employee_kpi WHERE emp_id=${id}`;
    const rows = await query(sql);
    var avg = rows.length ? { ...rows[0] } : {};
    res.json(avg);
    res.json(rows);
  } catch (error) {
    console.log(error.message);
    res.json(createError.InternalServerError());
  }
};

module.exports = { employeeAvgKpi };
