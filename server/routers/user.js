const Router = require('koa-router');
const router = new Router({ prefix: '/user'})
const bcrypt = require('bcryptjs')
const { emailRule, phoneRule } = require('../helper/validate')
const { UserModel } = require('../database/index')
/** 获取用户信息 */
router.get('/info', async (ctx) => {
  if (ctx.session.id) {
    const userInfo = await UserModel.getInfo(ctx.session.id)
    if (userInfo) {
      ctx.body = {
        success: true,
        payload: userInfo
      }
    } else {
      ctx.session = null
      ctx.throw(400,{message: '找不到用户'})
    }
  } else {
    ctx.throw(400,{message: '请先登录'})
  }
})

/** 账号登录 */
router.post('/login', async(ctx) => {
  const account = ctx.request.body.account;
  const password = ctx.request.body.password;
  let params = {}
  if (phoneRule.test(account)) {
    params = { phone: account }
  } else if(emailRule.test(account)){
    params = { email: account }
  } else {
    ctx.throw(400, '账号格式错误')
  }
  const userInfo = await UserModel.queryOne(params)
  if(userInfo){
    const checkPwd = bcrypt.compareSync(password, userInfo.password)
    if(checkPwd) {
      ctx.session.id = userInfo.id,
      ctx.session.userName = userInfo.userName
      ctx.body = {
        success: true,
        payload: userInfo
      }
    } else {
      ctx.throw(400, '登录密码错误')
    }
  } else {
    ctx.throw(400, '账号不存在')
  }
})

/** 注册 */
router.post('/register', async(ctx) => {
  const body = ctx.request.body;
  const userInfo = await UserModel.create(body)
  ctx.body = {
    payload: userInfo,
    success: true
  }
})

/** 修改密码 */
router.post('/modifyPassword', async(ctx) => {
  const oldPsd = ctx.request.body.oldPsd;
  const newPsd = ctx.request.body.newPsd;
  await UserModel.modifyPassword(ctx.session.id, oldPsd, newPsd)
  ctx.session = null
  ctx.body = {
    payload: [],
    success: true
  }

})

/** 退出登录 */
router.all('/logout', async(ctx, next) => {
  ctx.session = null
  ctx.body = {
    payload: [],
    success: true
  }
})


module.exports = router