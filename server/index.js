const Koa = require('koa')
const app = new Koa()
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

const sessionPlugin = require('./plugins/session/index')

const setHttpHeaders = require('./middleware/setHttpHeaders')
const exception = require('./middleware/exception')
const checkPermission = require('./middleware/checkPermission')

const router = require('./routers/index')
const config = require('./config')

/** 设置静态资源服务 */
app.use(static(path.join(__dirname, config.staticPath)))

/** plugins */
app.use(sessionPlugin)

/** middleware */
app.use(setHttpHeaders())
app.use(exception())
app.use(bodyParser())
app.use(checkPermission())

/** 注册路由 */
app.use(router.routes(), router.allowedMethods())

/** 处理错误 */
app.on('error', (err, ctx) => {
  console.error('SERVER ERROR:' + err.message)
});

/** 启动服务 */
const appCont = app.listen(config.port, config.host, () => {
  const { address, port } = appCont.address();
  console.log(`访问地址为  http://${address}:${port}`);
})