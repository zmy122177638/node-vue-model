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
      /** 
       * 重写cookie 
       * 如果安全级较低可以关闭，maxAge设置时间加长 
       * 当用户不发送新请求时,maxAge将根据第一次设置的时间设置
       * 当用户在maxAge的有效期内操作，此设置会实时在当前的时间重新设置maxAge
       * */
      const sessionId = ctx.cookies.get('SESSION_ID')
      if (sessionId) {
        ctx.cookies.set('SESSION_ID', sessionId, {maxAge: config.maxAge})
      }
      await next()
    }
  }
}