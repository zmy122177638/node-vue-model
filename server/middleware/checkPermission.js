
module.exports = () => {
  return async function(ctx,next){
    const filterRoutes = [
      '/zxd/zh/v1/api/user/info',
      '/zxd/zh/v1/api/user/login',
      '/zxd/zh/v1/api/user/register',
    ]
    if (!ctx.session.id && !filterRoutes.some((path) => ctx.path === path)) { 
      ctx.body = {
        success: false,
        error: {
          code: 3002,
          message: '登录状态失效'
        }
      }
    } else {
      await next()
    }
  }
}