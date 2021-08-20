const createError = require("http-errors");
const { query } = require("../database/connection");

const employeeAddKpi = async (req, res) => {
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
    var feedback_emp_id = req.body.feedback_emp_id;
    console.log(req.body);
  try {
    var sql =
    `insert into employee_kpi(
      emp_id
      sup_id,
      feedback_emp_id,
      availability,
      ontime,
      punctuality,
      regularity,
      timetorepair,
      criticalproblemsolving,
      clienthandling,
      innovative,
      teamPlayer,
      dependibility) 
      values (
        "${emp_id}",
        "${sup_id}",
        "${feedback_emp_id}",
        "${availability}",
        "${ontime}",
        "${punctuality}",
        "${regularity}",
        "${timetorepair}",
        "${criticalproblemsolving}",
        "${clienthandling}",
        "${innovative}",
        "${teamPlayer}",
        "${dependibility}"
      )`;
    console.log(`sql`, sql);
    const rows = await query(sql);
    // if (!rows.length()) {
    //   res.json(createError.InternalServerError());
    // }
    var jsonstr = JSON.stringify(rows);
     res.end(jsonstr);
    // res.json('connected');
  } catch (error) {
    console.log(error.message);
    res.json(createError.InternalServerError());
  }
};

module.exports = { employeeAddKpi };
