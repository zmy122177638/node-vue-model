
module.exports = () => {
  return async function(ctx,next){
    try {
      await next()
    } catch (error) {
      if (error.status === 400) {
        ctx.body = {
          error: {
            code: error.status,
            message: error.message
          },
          success: false
        }
      } else {
        ctx.status = error.status || 500
        ctx.app.emit('error',error, ctx)
      }
    }
  }
}