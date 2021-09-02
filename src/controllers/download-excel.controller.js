const excel = require("exceljs");
const { query } = require("../database/connection");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");
const sheet = require('xlsx');

exports.download = async (req, res) => {
  try {
    const sql = `SELECT e.emp_id,e.f_name,e.l_name,e.email,e.phone, AVG( kp.availability + kp.ontime + kp.punctuality + kp.regularity + kp.timetorepair + kp.criticalproblemsolving + kp.clienthandling + kp.innovative + kp.teamPlayer + kp.dependibility ) AS 'average', CONCAT(m.f_name, ' ', m.l_name) AS 'supervisor_name' FROM employee_master AS e LEFT JOIN employee_master AS m ON e.sup_id = m.emp_id LEFT JOIN employee_kpi AS kp ON kp.emp_id = e.emp_id GROUP BY e.emp_id`;
    let rows = await query(sql);
    console.log(rows)
    for await (let emp of rows) {
      let [avg_details] = await query(`SELECT kp.emp_id, AVG( kp.availability + kp.ontime + kp.punctuality + kp.regularity + kp.timetorepair + kp.criticalproblemsolving + kp.clienthandling + kp.innovative + kp.teamPlayer + kp.dependibility ) AS 'emp_average',AVG( kp2.availability + kp2.ontime + kp2.punctuality + kp2.regularity + kp2.timetorepair + kp2.criticalproblemsolving + kp2.clienthandling + kp2.innovative + kp2.teamPlayer + kp2.dependibility ) AS 'sup_average' FROM employee_kpi as kp INNER JOIN employee_kpi as kp2 on kp2.sup_id=kp2.feedback_emp_id WHERE kp.emp_id=kp.feedback_emp_id
       `);
      console.log('avg_details', avg_details)
      if (emp.emp_id === avg_details.emp_id) {

        emp.sup_average = avg_details.sup_average
        emp.emp_average = avg_details.emp_average
      } else {
        emp.sup_average = 0
        emp.emp_average = 0
      }
    }
    // console.log(JSON.stringify(rows,null,4))
    const header = ["emp_id", "f_name", "l_name", "email", "phone", "supervisor_name", "average", "sup_average", "emp_average"];
    const workSheet = sheet.utils.json_to_sheet(rows, { header });
    const workbook = sheet.utils.book_new();
    sheet.utils.book_append_sheet(workbook, workSheet);

    res.status(200).send(sheet.write(workbook, {
      type: "buffer",
    }));
  } catch (error) {
    // console.log(error.message);
    res.status(404).json(createError.BadRequest(error.message));
  }
};
