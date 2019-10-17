const express = require('express');
const router = express();
const sql_user = require('../plugins/mysql/user.js')
/**
 *  获取用户列表
 */
router.get('/getList', (req, res, next) => {
  sql_user.getUserList().then(data => {
    res.send({
      success: true,
      payload: data
    })
  }).catch((err)=>{
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
  }).catch((err)=>{
    next(err)
  })
})

/**
 *  删除用户
 */
router.post('/delUser', (req, res, next) => {
  if(!req.body.uid){ next({statusCode:200,message:'uid不能为空'}) }
  sql_user.delUser(req.body).then(data => {
    console.log(data.affectedRows);
    if(data.affectedRows > 0){
      res.send({
        success: true,
        payload: data
      })
    }else{
      next({statusCode:200,message:'删除失败,没有找到此用户'})
    }
  }).catch((err)=>{
    next(err)
  })
})

module.exports = router
