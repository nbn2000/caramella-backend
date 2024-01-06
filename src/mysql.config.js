const mysql = require("mysql");
const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "restfull_api",
});

db.getConnection((err, connection) => {
  if (err) return console.log(err.sqlMessage);
  connection.release();
  console.log("Database successfully connected!");
});

module.exports = db;
