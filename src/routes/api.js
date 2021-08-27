const router = require("express").Router();
var jwt = require("jsonwebtoken");
const api = require("../controllers/employee-list.controller");
const create = require("../controllers/employee-create.controller");
const update = require("../controllers/employee-update.controller");
const addKpi = require("../controllers/employee-addKpi.controller");
const underSuper = require("../controllers/employee-underSupervisor.controller");
const employeeById = require("../controllers/employee-detailsById.controller");
const employeeKpiDetails = require("../controllers/employee-kpiDetails.controller");
const supervisors = require("../controllers/supervisors-list.controller");
const givenKpiSuper = require("../controllers/supervisor-givenKpi.controller");
const givenKpiEmployee = require("../controllers/employee-givenKpi.controller");
const login = require("../controllers/master-login.controller");
const employeeDelete = require("../controllers/employee-delete.controller");
const employeeAvgKpi = require("../controllers/employee-averageKpi.controller");
const verifyToken = require("../controllers/verifyToken.controller");
const employeeGetOwnKpi = require("../controllers/employee-getOwn.controller");
const download = require("../controllers/download-excel.controller");
const {
  uploads,
  imageUpload,
} = require("../controllers/image-upload.controller");
const ownDetails=require('../controllers/own-details.controller');

router.get("/list", verifyToken.verifyToken, api.employeeList);
router.post("/create", create.employeeCreate);
router.put("/update/:id", update.employeeUpdate);
router.post("/add/:id", verifyToken.verifyToken, addKpi.employeeAddKpi);
router.post(
  "/employees",
  verifyToken.verifyToken,
  underSuper.employeeUnderSuper
);
router.get(
  "/details/:id",
  verifyToken.verifyToken,
  employeeById.employeeDetailsById
);
router.get("/ownDetails/:id", employeeById.employeeDetailsById);
router.get("/kpi_details/:id", employeeKpiDetails.employeeKpiDetails);
router.get("/supervisor", supervisors.supervisors);
router.get(
  "/sup_given_kpi_details/:id",
  verifyToken.verifyToken,
  givenKpiSuper.supervisorGivenKpi
);
router.get("/emp_given_kpi_details/:id", givenKpiEmployee.employeeGivenKpi);
router.get("/avgKpi/:id", employeeAvgKpi.employeeAvgKpi);
router.get("/employeeOwn/:id", employeeGetOwnKpi.employeeGetOwnKpi);
router.post("/masterlogin", login.masterLogin);
router.delete(
  "/delete/:id",
  verifyToken.verifyToken,
  employeeDelete.employeeDelete
);
router.get("/download-data", download.download);
router.get("/own-details/:id", ownDetails.ownDetails);

router.post("/upload-image/:emp_id", uploads.single("file"), imageUpload);

module.exports = router;
