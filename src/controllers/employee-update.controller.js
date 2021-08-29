const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeUpdate = async (req, res) => {
  var id = req.params.id;
  console.log("test");
  var f_name = req.body.f_name;
  var l_name = req.body.l_name;
  var phone = req.body.phone;
  var email = req.body.email;
  var role = req.body.role;
  var password = req.body.password;
  var sup_id=req.body.sup_id  ? 0 : Number(req.body.sup_id);
  console.log(req.body);

  try {
    const columns = [
      `f_name = '${f_name}'`,
      `l_name = '${l_name}'`,
      `phone = '${phone}'`,
      `email = '${email}'`,
      `sup_id = '${sup_id}'`,
      `role = '${role}'`,
    ];

    if (password) {
      columns.push(`password = ${password}`);
    }

    const sql = 
      `update employee_master set ${columns.join(', ')} where emp_id ='${id}'`;
    

    console.log(sql)

    // const values = [f_name, l_name, phone, email, password, sup_id, role, id];

    // var sql =
    //   "update employee_master set f_name='" +
    //   f_name +
    //   "',l_name='" +
    //   l_name +
    //   "',phone='" +
    //   phone +
    //   "', email='" +
    //   email +
    //   "', password='" +
    //   password +
    //   "',sup_id='" +
    //   sup_id +
    //   "',role='" +
    //   role +
    //   "' where emp_id='" +
    //   id +
    //   "'";
    // var sql =
    //   "update employee_master set f_name='" +
    //   f_name +
    //   "',l_name='" +
    //   l_name +
    //   "',phone='" +
    //   phone +
    //   "', email='" +
    //   email +
    //   "', password='" +
    //   password +
    //   "',sup_id='" +
    //   sup_id +
    //   "',role='" +
    //   role +
    //   "' where emp_id='" +
    //   id +
    //   "'";
    const rows = await query(sql);
    if (!rows.affectedRows) {
      return res.json(createError.InternalServerError());
    }
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.json(createError.InternalServerError());
  }
};
module.exports = { employeeUpdate };
