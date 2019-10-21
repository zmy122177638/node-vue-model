const $mysql = require('./index')

class UserTable {
  /**
   * @description: 获取用户列表
   * @return: Promise
   */
  getUserList() {
    return new Promise((resolve, reject) => {
      $mysql.query(`SELECT * FROM user`, (err, result) => {
        if (err) reject(err);
        resolve(result)
      })
    })
  }

  /**
   * @description: 添加用户
   * @param {String} email 邮箱
   * @param {String} phone 手机
   * @param {String} password 账户密码
   * @return: Promise
   */
  async addUser(params) {
    let sql, query, title;
    if (params.email) {
      /** 邮箱注册 */
      sql = `INSERT INTO user(email,password) VALUES('${params.email}','${params.password}')`
      query = { email: params.email }
      title = '邮箱'
    } else if(params.phone){
      /** 手机注册 */
      sql = `INSERT INTO user(phone,password) VALUES('${params.phone}','${params.password}')`
      query = { phone: params.phone }
      title = '手机号'
    }
    const queryRes = await this.queryUser(query);
    return new Promise((resolve, reject) => {
      if(!!queryRes.length){
        reject({
          statusCode: 200,
          code: 1062,
          message: `该${title}已存在`
        })
        return
      }
      $mysql.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result)
      })
    })
  }

  /**
   * @description: 删除用户
   * @param {String} uid 用户ID
   * @return: Promise
   */
  delUser(params) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM user WHERE uid='${params.uid}'`
      $mysql.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result)
      })
    })
  }

  /**
   * @description: 查询用户
   * @param {Object} params 查询参数
   * @return: 
   */
  queryUser(params){
    return new Promise((resolve, reject) => {
      const queryParams = Object.entries(params).map(t => `${t[0]}='${t[1]}'`).join(' AND ');
      const sql = `SELECT * FROM user WHERE ${queryParams}`
      $mysql.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result)
      })
    })
  }
}

module.exports = new UserTable();