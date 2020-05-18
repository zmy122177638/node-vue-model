/*
 * @Description: 
 * @Author: Anles
 * @Date: 2019-12-26 15:46:29
 * @LastEditors: Anles
 * @LastEditTime: 2020-05-15 09:59:53
 */
module.exports = {
  host: 'localhost',
  /** 端口号 */
  port: '3300',
  /** 静态服务路径 */
  staticPath: '/web',
  /** mysql配置 */
  mysql: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'mydb'
  },
  /** redis 配置 */
  redis: {
    port: 6379,
    host: '127.0.0.1',
  },
  /** session 配置 */
  session: {
    maxAge: 1000 * 60 * 30
  }
}