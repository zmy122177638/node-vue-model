const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const router = require('./routers/index.js')
const config = require('./config.js')
const path = require('path')

/** 设置静态资源服务 */
app.use(static(path.join(__dirname,config.staticPath)))

/** 启动路由 */
router(app)

/** 启动服务 */
const appCont = app.listen(config.port,config.host,()=>{
  const { address, port } = appCont.address();
  console.log(`访问地址为  http://${address}:${port}`);
})

/** 处理错误 */
app.on('error', (err, ctx) => {
  console.error('SERVER ERROR:'+ err.message)
});