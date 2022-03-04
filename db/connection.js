/*

const mysql = require('mysql2/promise');

const db = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Speak2Life$',
    database: 'employeeDBMS'
  });
}

module.exports = db; */

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Speak2Life$',
  database: 'employeedbms'
});

module.exports = db;