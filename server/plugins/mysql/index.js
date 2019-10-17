const mysql = require('mysql');

const $mysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mydb'
})

$mysql.connect();

module.exports = $mysql;