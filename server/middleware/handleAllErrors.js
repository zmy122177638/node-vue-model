
const errorMsg = {
  3002: '权限不足'
}
module.exports = () => {
  return async function(ctx,next){
    try {
      await next()
    } catch (error) {
      if (error.status === 400) {
        ctx.body = {
          error: {
            code: error.code || error.status,
            message: error.message || errorMsg[error.code]
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