const $mysql = require('./index')

module.exports = {

  /**
   * @description: 获取用户列表
   * @return: Promise
   */
  getUserList(){
    return new Promise((resolve,reject)=>{
      $mysql.query(`SELECT * FROM user`,(err,result) => {
        if(err) reject(err);
        resolve(result)
      })
    })
  },

  /**
   * @description: 添加用户
   * @param {String} account 账户
   * @param {String} password 账户密码
   * @return: Promise
   */
  addUser(params){
    return new Promise((resolve,reject)=>{
      const str = Object.values(params).map(t => `'${t}'`).join(',');
      const sql = `INSERT INTO user(account,password,phone) VALUES(${str})`
      $mysql.query(sql,(err,result) => {
        if(err) reject(err);
        resolve(result)
      })
    })
  },

  /**
   * @description: 删除用户
   * @param {String} uid 用户ID
   * @return: Promise
   */
  delUser(params){
    return new Promise((resolve,reject)=>{
      const sql = `DELETE FROM user WHERE uid='${params.uid}'`
      $mysql.query(sql,(err,result) => {
        if(err) reject(err);
        resolve(result)
      })
    })
  }
  
}