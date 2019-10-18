module.exports = (app) => {
  const express = require('express');
  const cors = require('cors');
  const { setBaseRequest } = require('../middleware/base.js')

  /** 添加路由中间件 */
  app.use(cors())
  app.use(express.json())
  app.use(setBaseRequest())
  app.use('/web/api/:module', require('./user.js'))

  // 错误处理函数
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
      success: false
    })
  })
}