const mysql = require('mysql');
const config = require('../../config.js')
const connect = mysql.createConnection(config.mysql)
const pool = mysql.createPool(config.mysql)
const getSqlContentMap = require('./utils/get-sql-content-map.js')

connect.connect((err) => {
  if (err) {
    console.error('MYSQL ERROR: ' + err.message)
  } else {
    console.error('MYSQL:' + connect.threadId)
  }
})

/** 连接池会话 */
function poolQuery(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

/** 数据库会话 */
function connectQuery(sql, values) {
  return new Promise((resolve, reject) => {
    connect.query(sql, values, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

/** 创建所有初始表 */
async function createAllTables() {
  const sqlContentMap = getSqlContentMap()
  for (let key in sqlContentMap) {
    let sqlShell = sqlContentMap[key]
    let sqlShellList = sqlShell.split(';')

    for (let [i, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        let result = await poolQuery(shell)
        if (result.serverStatus * 1 === 2) {
          eventLog(null, key, i)
        } else {
          eventLog(true, key, i)
        }
      }
    }
  }
}

function eventLog (err, sqlFile, index) {
  if (err) {
    console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
  } else {
    console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`)
  }
}

module.exports = {
  poolQuery,
  connectQuery,
  createAllTables
}