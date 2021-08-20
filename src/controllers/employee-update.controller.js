const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeUpdate = async (req, res) => {
  var id = req.params.id;
  console.log("test");
  var f_name = req.body.f_name;
  var l_name = req.body.l_name;
  var phone = req.body.phone;
  var email = req.body.email;
  var status = req.body.status;
  var password = req.body.password;
  var sup_id = req.body.sup_id;
  console.log(req.body);
  try {
    var sql =
      "update employee_master set f_name='" +
      f_name +
      "',l_name='" +
      l_name +
      "',phone='" +
      phone +
      "', email='" +
      email +
      "', password='" +
      password +
      "',sup_id='" +
      sup_id +
      "',status='" +
      status +
      "' where emp_id='" +
      id +
      "'";
    const rows = await query(sql);
    if (!rows.length()) {
      res.json(createError.InternalServerError());
    }
    res.json("connected");
  } catch (error) {
    console.log(error.message);
    res.json(createError.InternalServerError());
  }
};
module.exports = { employeeUpdate };
