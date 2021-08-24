const multer = require("multer");
const { query } = require("../database/connection");
const { v4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "upload");
  },
  filename: (req, file, callBack) => {
    console.log("file", file);
    const ext = path.extname(file.originalname);
    const fileHash = v4();
    const fileName = `${fileHash}${ext}`;
    callBack(null, `${fileName}`);
  },
});

exports.uploads = multer({ storage: storage });

// exports.imageUpload = async (req, res) => {
//   const file = req.file;
//   console.log(file.filename);
//   if (!file) {
//     return res.status(404).json("Please Upload a file");
//   }
//   res.json(file);
// };

// localhost:3000/upload/m-650.png
// Base64

exports.imageUpload = async (req, res) => {
  if (!req.file || Object.keys(req.file).length === 0) {
    return res.status(400).send("No file were uploaded.");
  }

  const emp_id = req.params.emp_id;

  try {
    results = await query(
      `UPDATE employee_master SET image = '${req.file.filename}' where emp_id='${emp_id}'`
    );
    res.send(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
