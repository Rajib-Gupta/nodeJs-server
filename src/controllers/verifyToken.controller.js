const createError = require("http-errors");
var jwt = require("jsonwebtoken");


const verifyToken= async(req, res, next)=> {
    try {
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
    } catch (error) {
        console.log(error.message);
        res.json(createError.InternalServerError())
        
    }
   
  }
  module.exports={verifyToken}