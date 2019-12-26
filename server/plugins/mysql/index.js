const mysql = require('mysql');
const config = require('../../config.js')
const $mysql = mysql.createConnection(config.mysql)

$mysql.connect((err) => {
  if (err) {
    console.log('MYSQL SERVER ERROR: ' + err.message)
  }
});

module.exports = $mysql;