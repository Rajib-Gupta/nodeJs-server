const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeKpiDetails = async (req, res) => {
    var id = req.params.id;
    console.log(id);
  
  try {
    var sql = `select * from employee_kpi where emp_id=${id}`;
    const rows = await query(sql);
    var kpi = rows.length ? { ...rows[0] } : {};
    res.json(kpi);
  } catch (error) {
    console.log(error.message);
    res.json(createError.InternalServerError());
  }
};

module.exports = { employeeKpiDetails };
