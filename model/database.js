require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    let sql = "DROP TABLE if exists users; CREATE TABLE users(uid INT NOT NULL AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(500), role ENUM('admin', 'basic') DEFAULT 'basic', PRIMARY KEY (uid));";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table creation `users` was successful!");
    });

    sql = "DROP TABLE if exists items; CREATE TABLE items(item_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, description VARCHAR(255), price INT NOT NULL, quantity INT DEFAULT 0, PRIMARY KEY (item_id));";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table creation `items` was successful!");
    });

  con.end();
});


