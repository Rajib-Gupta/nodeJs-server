const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeCreate = async (req, res) => {
  var { f_name, l_name, email, phone, role, password, sup_id } = req.body;
  sup_id= Number(sup_id)===0?0:sup_id;
  try {
    const sql = `insert into employee_master(f_name,l_name,phone,email,role,password,sup_id) values ("${f_name}","${l_name}","${email}","${phone}","${role}","${password}","${sup_id}")`;
    const insertedData = await query(sql);
    if (!insertedData.affectedRows) {
     return res.json(createError.InternalServerError());
    }
    res.json({ insertId: insertedData.insertId });
  } catch (error) {
    console.log(error.message);
    res.json(createError.InternalServerError());
  }
};

module.exports = { employeeCreate };
