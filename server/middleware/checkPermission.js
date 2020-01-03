const config = require('../config.js')
module.exports = () => {
  return async function(ctx,next){
    const filterRoutes = [
      '/zxd/zh/v1/api/user/info',
      '/zxd/zh/v1/api/user/login',
      '/zxd/zh/v1/api/user/register',
    ]
    if (!ctx.session.id && !filterRoutes.some((path) => ctx.path === path)) {
      ctx.throw(400,{code: 3002})
    } else {
      /** 重写cookie设置 */
      ctx.cookies.set('SESSION_ID', ctx.cookies.get('SESSION_ID'),{maxAge: config.maxAge})
      await next()
    }
  }
}