const Router = require('koa-router');
const router = new Router({ prefix: '/user'})
const bcrypt = require('bcryptjs')
const { UserModel } = require('../dao/index')
const { getRedis, setRedis } = require('../plugins/redis/index')
const Validator = require('../validator/validator')
const UserValidator = require('../validator/models/user')

/** 获取用户信息 */
router.get('/info', async (ctx) => {
  if (ctx.session.id) {
    const userInfo = await UserModel.getInfo(ctx.session.id)
    const cacheData = await getRedis(ctx.session.id)
    if (cacheData) {
      console.log('redis用户缓存')
      ctx.body = ctx.success(cacheData)
    } else {
      if (userInfo) {
        setRedis(ctx.session.id, userInfo, 3)
        ctx.body = ctx.success(userInfo)
      } else {
        ctx.session = null
        ctx.throw(400,{message: '找不到用户'})
      }
    }
  } else {
    ctx.throw(400,{message: '请先登录'})
  }
})

/** 账号登录 */
router.post('/login', async(ctx) => {
  const { success, message } = await new Validator(UserValidator.regLogin).validate(ctx.request.body)
  if (!success) {
    ctx.throw(400,message)
    return
  }
  const account = ctx.request.body.account;
  const password = ctx.request.body.password;
  const userInfo = await UserModel.checkPhoneEmail(account)
  if(userInfo){
    const checkPwd = bcrypt.compareSync(password, userInfo.password)
    if(checkPwd) {
      ctx.session.id = userInfo.id,
      ctx.session.userName = userInfo.userName
      ctx.body = ctx.success(userInfo)
    } else {
      ctx.throw(400, '登录密码错误')
    }
  } else {
    ctx.throw(400, '账号不存在')
  }
})

/** 注册 */
router.post('/register', async(ctx) => {
  const { success, message } = await new Validator(UserValidator.regLogin).validate(ctx.request.body)
  if (!success) {
    ctx.throw(400, message)
    return
  }
  const body = ctx.request.body;
  const userInfo = await UserModel.create(body)
  ctx.body = ctx.success(userInfo)
})

/** 修改密码 */
router.post('/modifyPassword', async(ctx) => {
  const oldPsd = ctx.request.body.oldPsd;
  const newPsd = ctx.request.body.newPsd;
  await UserModel.modifyPassword(ctx.session.id, oldPsd, newPsd)
  ctx.session = null
  ctx.body = ctx.success()
})

/** 退出登录 */
router.all('/logout', async(ctx, next) => {
  ctx.session = null
  ctx.body = ctx.success()
})


module.exports = router