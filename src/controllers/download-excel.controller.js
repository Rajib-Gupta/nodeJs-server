const excel = require("exceljs");
const { query } = require("../database/connection");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");

exports.download = async (req, res) => {
  try {
    const sql = `SELECT e.*, AVG( kp.availability + kp.ontime + kp.punctuality + kp.regularity + kp.timetorepair + kp.criticalproblemsolving + kp.clienthandling + kp.innovative + kp.teamPlayer + kp.dependibility ) AS 'average', CONCAT(m.f_name, ' ', m.l_name) AS 'supervisor_name' FROM employee_master AS e LEFT JOIN employee_master AS m ON e.sup_id = m.emp_id LEFT JOIN employee_kpi AS kp ON kp.emp_id = e.emp_id GROUP BY e.emp_id`;
    const rows = await query(sql);
    // const workBook = new excel.Workbook();
    // const workSheet = workBook.addWorksheet("employee-kpi");
    // workSheet.columns = [
    //   { header: "s_no", key: "s_no", width: 10 },
    //   { header: "Emp_id", key: "emp_id", width: 10 },
    //   { header: "F_name", key: "f_name", width: 10 },
    //   { header: "L_name", key: "l_name", width: 10 },
    //   { header: "Email", key: "email", width: 10 },
    //   { header: "Phone", key: "phone", width: 10 },
    //   { header: "Supervisor Name", key: "supervisor_name", width: 10 },
    //   { header: "Average Kpi", key: "average", width: 10 },
    // ];
    // rows.forEach((element, index) => {
    //   element.s_no = index + 1;
    //   workSheet.addRow(element);
    // });
    // workSheet.getRow(1).eachCell((cell) => {
    //   cell.font = { bold: true };
    // });

    // const fileName = "KPI.xlsx";
    // await workBook.xlsx.writeFile(fileName);
    // const base64File = fs.readFileSync(fileName);

    const header=[
      { header: "s_no", key: "s_no", width: 10 },
      { header: "Emp_id", key: "emp_id", width: 10 },
      { header: "F_name", key: "f_name", width: 10 },
    ];
    const workSheet= sheet.utils.json_to_sheet(sheetData,{header});
    

    res.status(200).send(base64File);
  } catch (error) {
    // console.log(error.message);
    res.status(404).json(createError.BadRequest(error.message));
  }
};
