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
  /** sessionID过期时间设置 */
  maxAge: 1000 * 60 * 30
}