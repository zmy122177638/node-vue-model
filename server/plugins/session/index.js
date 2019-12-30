const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const config = require('../../config.js')

// 配置存储session信息的mysql
let store = new MysqlSession(config.mysql)

module.exports = session({
  key: 'SESSION_ID',
  store: store,
  cookie: config.sessionCookie
})