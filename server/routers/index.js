module.exports = (app) => {
  const setHttpHeaders = require('../middleware/setHttpHeaders.js')
  const handleAllErrors = require('../middleware/handleAllErrors.js')
  const bodyParser = require('koa-bodyparser')
  const Router = require('koa-router')
  const router = new Router()
  /** 子路由 */
  const user = require('./user.js')

  // /** 添加路由中间件 */
  app.use(setHttpHeaders())
  app.use(handleAllErrors())
  app.use(bodyParser())
  
  /** 合并路由 */
  router.use('/zxd/zh/v1/api', user.routes())

  /** 注册路由 */
  app.use(router.routes())
}