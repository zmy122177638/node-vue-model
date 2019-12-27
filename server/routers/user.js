const Router = require('koa-router');
const router = new Router({ prefix: '/user'})
const SQLUser = require('../plugins/mysql/user.js')

/**
 * 账号登录
 */
router.post('/login', async(ctx, next) => {
  const account = ctx.request.body.account;
  const password = ctx.request.body.password;
  const phoneReg = /^1[3456789][0-9]{9}$/
  const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  let params = {}
  if (phoneReg.test(account)) {
    params = { phone: account }
  } else if(emailReg.test(account)){
    params = { email: account }
  } else {
    ctx.throw(400, '账号格式错误')
  }
  const result = await SQLUser.queryUser(params)
  if(Array.isArray(result) && !!result.length){
    const loginInfo = result[0]
    if(loginInfo.password === password) {
      ctx.body = {
        success: true,
        payload: loginInfo
      }
    } else {
      ctx.throw(400, '登录密码错误')
    }
  } else {
    ctx.throw(400, '账号不存在')
  }
})

/**
 *  注册
 */
router.post('/register', async(ctx, next) => {
  const queryUser = await SQLUser.queryUser(ctx.request.body)
  if(Array.isArray(queryUser) && !!queryUser.length) {
    const title = ctx.request.body.phone ? '手机号' : '邮箱'
    ctx.throw(400, `该${title}已注册`)
  } else {
    await SQLUser.addUser(ctx.request.body)
    ctx.body = {
      payload: [],
      success: true
    }
  }
})


module.exports = router