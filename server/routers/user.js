const express = require('express');
const router = express();
const sql_user = require('../plugins/mysql/user.js')

/**
 * 账号登录
 */
router.get('/login', (req, res, next) => {
  const account = req.query.account;
  const password = req.query.password;
  const phoneReg = /^1[3456789][0-9]{9}$/
  const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  let params = {}
  if(phoneReg.test(account)){
    params = { phone: account, password}
  } else if(emailReg.test(account)){
    params = { email: account, password}
  } else {
    next({statusCode: 200, message: '账号格式错误'})
    return;
  }
  sql_user.queryUser(params).then((data) => {
    if(Array.isArray(data) && !!data.length){
      res.send({
        success: true,
        payload: data[0]
      })
    } else {
      next({statusCode: 200, message: '账号不存在'})
    }
  }).catch((err) => {
    next(err)
  })
})

/**
 *  获取用户列表
 */
router.get('/getList', (req, res, next) => {
  sql_user.getUserList().then(data => {
    res.send({
      success: true,
      payload: data
    })
  }).catch((err) => {
    next(err)
  })
})

/**
 *  新增用户
 */
router.post('/addUser', (req, res, next) => {
  sql_user.addUser(req.body).then(data => {
    res.send({
      success: true,
      payload: data
    })
  }).catch((err) => {
    next(err)
  })
})

/**
 *  删除用户
 */
router.post('/delUser', (req, res, next) => {
  if (!req.body.uid) {
    next({
      statusCode: 200,
      message: 'uid不能为空'
    })
  }
  sql_user.delUser(req.body).then(data => {
    console.log(data.affectedRows);
    if (data.affectedRows > 0) {
      res.send({
        success: true,
        payload: data
      })
    } else {
      next({
        statusCode: 200,
        message: '删除失败,没有找到此用户'
      })
    }
  }).catch((err) => {
    next(err)
  })
})

module.exports = router