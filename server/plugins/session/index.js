const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const config = require('../../config.js')

// 配置存储session信息的mysql
let store = new MysqlSession(config.mysql)

const plugin = session({
  key: 'SESSION_ID',
  store: store,
  cookie: {
    domain: 'localhost',  // 写cookie所在的域名
    path: '/',       // 写cookie所在的路径
    maxAge: config.maxAge, // cookie有效时长
    expires: new Date(),  // cookie失效时间
    httpOnly: false,  // 是否只用于https请求中获取
    overwrite: false  // 是否允许重写
  }
})


module.exports = plugin