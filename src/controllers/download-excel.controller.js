const excel = require("exceljs");
const { query } = require("../database/connection");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");
const sheet=require('xlsx');

exports.download = async (req, res) => {
  try {
    const sql = `SELECT e.emp_id,e.f_name,e.l_name,e.email,e.phone, AVG( kp.availability + kp.ontime + kp.punctuality + kp.regularity + kp.timetorepair + kp.criticalproblemsolving + kp.clienthandling + kp.innovative + kp.teamPlayer + kp.dependibility ) AS 'average', CONCAT(m.f_name, ' ', m.l_name) AS 'supervisor_name' FROM employee_master AS e LEFT JOIN employee_master AS m ON e.sup_id = m.emp_id LEFT JOIN employee_kpi AS kp ON kp.emp_id = e.emp_id GROUP BY e.emp_id`;
    const rows = await query(sql);
    const header=["emp_id","f_name","l_name","email","phone","supervisor_name","average"];
    const workSheet= sheet.utils.json_to_sheet(rows,{header});
    const workbook = sheet.utils.book_new();
     sheet.utils.book_append_sheet(workbook,workSheet);

    res.status(200).send(sheet.write(workbook,{
      type:"buffer",
    }));
  } catch (error) {
    // console.log(error.message);
    res.status(404).json(createError.BadRequest(error.message));
  }
};
