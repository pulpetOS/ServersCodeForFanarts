const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ error: false, message: "Hello!" });
});
app.get("/list", (req, res) => {
  const mysql = require("mysql2");

  // create connection
  const db = mysql.createConnection({
    host: process.env["HOST"],
    user: process.env["USER"],
    password: process.env["PASSWORD"],
    database: process.env["DATABASE"],
  });

  // connect
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL!");
  });

  // get all rows
  const sql = "SELECT `by`, `url` FROM Listofcreator";

  db.query(sql, (err, results) => {
    if (err) {
      res.json({ error: true, message: err.message });
      db.end();
    }
    res.json({ error: false, Data: results });
    db.end();
  });
});

app.listen(8000, () => console.log("API running on port 8000"));
