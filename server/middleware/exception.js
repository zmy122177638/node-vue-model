const { ERROR_CODE_MESSAGE } = require('../constants/constants')
module.exports = () => {
  return async function(ctx,next){
    /** 全局共用错误 更多使用查看 https://github.com/jshttp/http-errors */
    global.throw = ctx.throw
    try {
      await next()
    } catch (error) {
      /** 判断错误是否发送至客户端 */
      if (error.expose) {
        ctx.body = {
          error: {
            code: error.code || error.status,
            message: ERROR_CODE_MESSAGE[error.code] || error.message || '服务错误'
          },
          success: false
        }
      } else {
        /** 应用级错误 */ 
        ctx.status = error.status || 500
        ctx.app.emit('error',error, ctx)
      }
    }
  }
}