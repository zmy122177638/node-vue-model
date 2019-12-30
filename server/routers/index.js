const Router = require('koa-router')
const router = new Router()
/** 子路由 */
const user = require('./user.js')

/** 合并路由 */
router.use('/zxd/zh/v1/api', user.routes())

module.exports = router