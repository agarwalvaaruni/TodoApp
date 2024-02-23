const express = require("express");
const multer = require("multer");

const app = express();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-PostMan.jpg");
//     },
//   }),
// });

// app.post("/stats", upload.single("uploaded_file"), (req, res)=>{
//   res.status(200).send("File uploaded successfully!");
// });

const upload = multer({ dest: 'uploads'})   //if do not want to change filename
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
   res.send("Uploaded");
});

app.listen(5000);
