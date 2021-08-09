var express = require("express");
var app = express();
const mysql2 = require("mysql2/promise");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var multer = require("multer");
var mysql = require("mysql");

const dotenv = require("dotenv");
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const createError = require("http-errors");
var upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//image uploads

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now + file.originalname);
  },
});

async function main() {
  app.post("/uploads/:id", upload.single("image"), function (req, res, next) {
    var id = req.params.id;
    var fileinfo = req.file.originalname;
    var title = req.body.title;
    console.log(req.file);

    try {
      var sql = `UPDATE employee_master set image="${fileinfo}" where emp_id="${id}"`;
      console.log(sql);
      con.query(sql, function (error, results, fields) {
        //  console.log({ error, results, fields });
        if (error) {
          res.status(400).json({ error: error.message, code: error.code });
        }
        if (results) {
          console.log("Connected!");
          res.end('{"res":"Saved"}');
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
    // console.log(title);
    // res.send(fileinfo);
  });

  /* Permission for CORS policy */
  app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    next();
  });

  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: isProd ? "Admin@008" : "",
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB,
  });

  var con2;

  try {
    con2 = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: isProd ? "Admin@008" : "",
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DB,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  // con.connect(function (err) {
  //   if (err) {
  //     console.log(err.message);
  //     process.exit(1);
  //   }
  // });

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  // add employee

  app.post("/create", verifyToken, function (req, res) {
    console.log("test");
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var phone = req.body.phone;
    var email = req.body.email;
    var sup_id = req.body.sup_id;
    var role = req.body.role;
    var password = req.body.password;

    console.log(req.body);

    try {
      var sql =
        "insert into employee_master(f_name,l_name,phone,email,role,password,sup_id) values ('" +
        f_name +
        "','" +
        l_name +
        "','" +
        phone +
        "','" +
        email +
        "','" +
        role +
        "','" +
        password +
        "','" +
        sup_id +
        "')";
      con.query(sql, function (error, results, fields) {
        //  console.log({ error, results, fields });
        if (error) {
          res.status(400).json({ error: error.message, code: error.code });
        }
        if (results) {
          console.log("Connected!");
          res.end('{"res":"Saved"}');
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/add/:id", function (req, res) {
    console.log("test");
    var emp_id = req.params.id;
    var sup_id = req.body.sup_id;
    var availability = req.body.availability;
    var ontime = req.body.ontime;
    var punctuality = req.body.punctuality;
    var regularity = req.body.regularity;
    var timetorepair = req.body.timetorepair;
    var criticalproblemsolving = req.body.criticalproblemsolving;
    var clienthandling = req.body.clienthandling;
    var innovative = req.body.innovative;
    var teamPlayer = req.body.teamPlayer;
    var dependibility = req.body.dependibility;
    var given_by_id = req.body.given_by_id;
    var submit_date = req.body.submit_date;
    var tenure = req.body.tenure;
    var feedback_emp_id = req.body.feedback_emp_id;

    console.log(req.body);
    var sql =
      "insert into employee_kpi(emp_id,sup_id,feedback_emp_id,availability,ontime,punctuality,regularity,timetorepair,criticalproblemsolving,clienthandling,innovative,teamPlayer,dependibility,given_by_id,submit_date,tenure) values ('" +
      emp_id +
      "','" +
      sup_id +
      "','" +
      feedback_emp_id +
      "','" +
      availability +
      "','" +
      ontime +
      "','" +
      punctuality +
      "','" +
      regularity +
      "','" +
      timetorepair +
      "','" +
      criticalproblemsolving +
      "','" +
      clienthandling +
      "','" +
      innovative +
      "','" +
      teamPlayer +
      "','" +
      dependibility +
      "','" +
      given_by_id +
      "','" +
      submit_date +
      "','" +
      tenure +
      "')";
    console.log(`sql`, sql);
    con.query(sql);
    console.log("Connected!");
    res.end('{"res":"Saved"}');
  });

  // update employee by id

  app.put("/update/:id", verifyToken, function (req, res) {
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
    con.query(sql);
    console.log("Connected!");
    console.log(sql);
    res.end('{"res":"Update"}');
  });

  //get kpi list ny id

  app.get("/kpi/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    var sql = "select * from employee_kpi where emp_id='" + id + "'";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      var jsonstr = JSON.stringify(result);
      res.end(jsonstr);
    });

    console.log("connected!");
  });

  // get all employees list

  app.get("/list", function (req, res) {
    var sql =
      "SELECT e.*, CONCAT(em.f_name, ' ',em.l_name) as 'supervisor_name' FROM employee_master as e INNER JOIN employee_master as em ON e.sup_id = em.emp_id;";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      var jsonstr = JSON.stringify(result);
      res.end(jsonstr);
    });

    // console.log("Connected!");
    // res.end("Save done!!");
  });

  app.get("/supervisor", function (req, res) {
    var sql = "SELECT * FROM employee_master where role=0 ";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      var jsonstr = JSON.stringify(result);
      res.end(jsonstr);
    });

    // console.log("Connected!");
    // res.end("Save done!!");
  });

  //get colleagues for employee
  // app.get("/colleagues", verifyColleague, function (req, res) {
  //   var email = req.body.email;
  //   var sql = `SELECT em.* FROM employee_master as e INNER JOIN employee_master as em on em.sup_id = e.sup_id and em.emp_id != e.emp_id where e.email="${email}"`;
  //   con.query(sql, function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //     var jsonstr = JSON.stringify(result);
  //     res.end(jsonstr);
  //   });
  // });

  // app.get("/employees", async (req, res) =>{
  //   var email = req.body.email;
  //   var sql = `
  //   SELECT em.* FROM employee_master as e INNER JOIN employee_master as em on em.sup_id = e.emp_id and e.emp_id!=em.emp_id where e.email="${email}"`;
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     var jsonstr = JSON.stringify({password,...result});
  //     res.end(jsonstr);
  //   });
  //   });

  app.post("/employees", async (req, res) => {
    var email = req.body.email;
    var sql = `
    SELECT em.* FROM employee_master as e INNER JOIN employee_master as em on em.sup_id = e.emp_id and e.emp_id!=em.emp_id where e.email="${email}"`;
    var [rows] = await con2.execute(sql);
    var employees = rows.length ? rows : [];
    if (!employees.length) {
      res.json(createError.BadRequest());
    } else {
      employees = employees.map((emp) => {
        delete emp.password;
        return emp;
      });
      res.json(employees);
    }
  });

  // get employee by id
  app.get("/details/:id", verifyToken, function (req, res) {
    var id = req.params.id;
    console.log(id);
    var sql = "select * from employee_master where emp_id='" + id + "'";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      var jsonstr = JSON.stringify(result[0]);
      res.end(jsonstr);
    });

    console.log("Connected!");
    //res.end("Save done!!");
  });

  // get employee Kpi by id
  app.get("/kpi_details/:id", verifyToken, function (req, res) {
    var id = req.params.id;
    console.log(id);
    var sql = "select * from employee_kpi where emp_id='" + id + "'";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      var jsonstr = JSON.stringify(result[0]);
      res.end(jsonstr);
    });

    console.log("Connected!");
    //res.end("Save done!!");
  });

  app.post("/signIn", async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log("req", req.body);
    con.query(
      `select * from employee_master where role=1 and email="${email}" and password="${password}"`,
      async function (error, results, fields) {
        console.log({ error, results });
        var admin = results.length ? { ...results[0] } : {};
        if (error) {
          res.send({
            code: 400,
            failed: "error ocurred",
          });
        } else {
          if (results.length > 0) {
            const comparision = password === results[0].password;
            //const comparision = await bcrypt.compare(password, results[0].password)
            console.log("comparision", comparision);
            if (comparision) {
              let payload = { subject: password };
              let token = jwt.sign(payload, "secretKey");
              res.send({
                code: 200,
                success: "login sucessfull",
                token,
                admin: admin,
              });
            } else {
              res.send({
                code: 204,
                success: "Email and password does not match",
              });
            }
          } else {
            res.send({
              code: 206,
              success: "Email does not exits",
            });
          }
        }
      }
    );

    console.log("Connected!");
  });

  // supervisor end point

  app.post("/masterlogin", async (req, res) => {
    var { email, password, role } = req.body;
    console.log("test", req.body);
    try {
      const sql = `select * from employee_master where role="${role}" and email="${email}" and password="${password}"`;
      console.log("sql", sql);
      var [rows] = await con2.execute(sql);
      var { password, ...master } = rows.length ? { ...rows[0] } : {};
      if (!rows.length) {
        res.json(createError.BadRequest());
      } else {
        const comparision =
          password === rows[0].password && role === rows[0].role;
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
  });

  function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorize Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
      return res.status(401).send("Unauthorize Request");
    }
    let payload = jwt.verify(token, "secretKey");
    console.log(payload);
    if (!payload) {
      return res.status(401).send("Unauthorize Request");
    }
    req.id = payload.subject;
    next();
  }

  function verifyColleague(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorize Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
      return res.status(401).send("Unauthorize Request");
    }
    try {
      let payload = jwt.verify(token, "secretKey");
      console.log(payload);
      if (!payload) {
        return res.status(401).send("Unauthorize Request");
      }
      req.body.email = payload.subject;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send("Unauthorize Request");
    }
  }

  // user login fuctionality

  app.post("/login", async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log("req", req.body);

    const Status400Res = {
      code: 400,
      failed: "error ocurred",
    };

    con.query(
      `select * from employee_master where role!=1 and email="${email}"`,
      async function (error, results, fields) {
        console.log(error);
        console.log({ error, results });
        var employee = results.length ? { ...results[0] } : {};
        if (error) {
          res.send(Status400Res);
        } else {
          if (results.length > 0) {
            const comparision = password === results[0].password;
            console.log("comparision", comparision);
            if (comparision) {
              let payload = { subject: email };
              let token = jwt.sign(payload, "secretKey");
              res.send({
                code: 200,
                success: "login sucessfull",
                token,
                employee: employee,
              });
            } else {
              res.send({
                code: 204,
                success: "Email and password does not match",
              });
            }
          } else {
            res.send({
              code: 206,
              success: "Email does not exits",
            });
          }
        }
      }
    );

    console.log("Connected!");
  });

  app.delete("/delete/:id", verifyToken, function (req, res) {
    var id = req.params.id;
    console.log("test");
    console.log(req.body);
    var sql = "DELETE FROM employee_master where emp_id='" + id + "'";
    con.query(sql);
    console.log("Connected!");
    console.log(sql);
    res.end('{"res":"Delete"}');
  });

  app.post("/new", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const sql = `Select * from employee_master where email="${email}"`;
      var [rows] = await con2.execute(sql);
      const user = rows[0];

      if (!user) {
        res.send(
          createError.Unauthorized(
            "Invalid credentials! Please check and try again."
          )
        );
        return;
      }

      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        res.send(
          createError.Unauthorized(
            "Invalid credentials! Please check and try again."
          )
        );
        return;
      }

      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.send(createError.InternalServerError());
    }
  });

  var server = app.listen(3000, function () {});
}

main();

// input[type="email"]
// input[type="password"]
// select
//   option

//   SELECT * from table where email=email and password=password and role=roll
