const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306, //This is the default PORT for MySQL

  //Your username
  user: "root",

  //Your password
  password: process.env.mysql_pw,
  database: "bamazon_DB"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  connection.end();
});