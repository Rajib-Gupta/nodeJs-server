const createError = require("http-errors");
const { query } = require("../database/connection");
var jwt = require("jsonwebtoken");

const masterLogin = async (req, res) => {
  var { email, password, role } = req.body;
  console.log("test", req.body);
  try {
   // const sql = `select * from employee_master where role="${role}" and email="${email}" and password="${password}"`;
    const sql = `select * from employee_master where email="${email}" and password="${password}"`;
    console.log("sql", sql);
    var rows = await query(sql);
    var { password, ...master } = rows.length ? { ...rows[0] } : {};
    if (!rows.length) {
      res.json(createError.BadRequest());
    } else {
      const comparision =
        //password === rows[0].password && role === rows[0].role;
        password === rows[0].password;
      console.log("comparision", comparision);
      if (!comparision) {
        res.json(createError.BadRequest());
      } else {
        let payload = { subject: email };
        let token = jwt.sign(payload, "secretKey");
        res.send({
          code: 200,
          success: "login sucessfull",
          token,
          data: master,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json(createError.BadRequest("Invalid user!"));
  }
};

module.exports = { masterLogin };
