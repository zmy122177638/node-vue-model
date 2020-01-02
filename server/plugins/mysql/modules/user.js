const { poolQuery, connectQuery } = require('../index')

class UserTable {
  /**
   * @description: 添加用户
   * @param {String} email 邮箱
   * @param {String} phone 手机
   * @param {String} password 账户密码
   * @return: Promise
   */
   addUser(params) {
    let sql;
    if (params.email) {
      /** 邮箱注册 */
      sql = `INSERT INTO user(email,password) VALUES('${params.email}','${params.password}')`
    } else if(params.phone){
      /** 手机注册 */
      sql = `INSERT INTO user(phone,password) VALUES('${params.phone}','${params.password}')`
    }
    return connectQuery(sql)
  }

  /**
   * @description: 查询用户
   * @param {Object} params 查询参数
   * @return: 
   */
  queryUser(params){
    const queryParams = Object.entries(params).map(t => `${t[0]}='${t[1]}'`).join(' AND ');
    const sql = `SELECT * FROM user WHERE ${queryParams}`
    return connectQuery(sql)
  }
}

module.exports = new UserTable();