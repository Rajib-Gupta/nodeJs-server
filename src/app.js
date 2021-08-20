const express = require("express");
const router = require("./routes/api");
const cors = require("cors");
const morgan = require("morgan");
require("./database/connection")

const app = express();
require("./database/connection");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded());

app.use("/api", router);

module.exports = app;
