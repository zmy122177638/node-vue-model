const Router = require('koa-router');
const router = new Router({ prefix: '/user'})
const SQLUser = require('../plugins/mysql/user.js')

/**
 * 账号登录
 */
router.get('/login', async(ctx, next) => {
  const account = ctx.query.account;
  const password = ctx.query.password;
  const phoneReg = /^1[3456789][0-9]{9}$/
  const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  let params = {}
  if(phoneReg.test(account)){
    params = { phone: account, password}
  } else if(emailReg.test(account)){
    params = { email: account, password}
  } else {
    ctx.throw(400, '账号格式错误')
  }
  const result = await SQLUser.queryUser(params)
  if(Array.isArray(result) && !!result.length){
    ctx.body = {
      success: true,
      payload: result[0]
    }
  } else {
    ctx.throw(400, '账号不存在')
  }
})

/**
 *  获取用户列表
 */
router.get('/getList', ({ req, res }, next) => {
  SQLUser.getUserList().then(data => {
    res.send({
      success: true,
      payload: data
    })
  }).catch((err) => {
    next(err)
  })
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