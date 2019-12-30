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
  /** cookie配置 */
  sessionCookie: {
    domain: 'localhost',  // 写cookie所在的域名
    path: '/',       // 写cookie所在的路径
    maxAge: 1000 * 60 * 30, // cookie有效时长
    expires: new Date(),  // cookie失效时间
    httpOnly: false,  // 是否只用于http请求中获取
    overwrite: false  // 是否允许重写
  }
}