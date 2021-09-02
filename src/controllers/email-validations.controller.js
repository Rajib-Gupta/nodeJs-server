const createError = require("http-errors");
const { query } = require("../database/connection");

exports.emailValidation=async(req,res)=>{
    const email=req.body.email;
    try {
        const sql=`SELECT COUNT(*) AS cnt FROM employee_master WHERE email ="${email}"` ;
        const rows=await query(sql)
    //      if(!rows.length){  
    //        res.json(createError.BadRequest())
    //   }
     var {...user} = rows.length ? { ...rows[0] } : {};
      res.json(user);  
    } catch (error) {
        console.log(error)
        res.json(createError.BadRequest())
    }
}