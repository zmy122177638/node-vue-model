module.exports = (app) => {
  const express = require('express');
  const setHttpHeader = require('../middleware/setHttpHeader.js')

  /** 添加路由中间件 */
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(setHttpHeader())
  app.use('/v1/web/api/user', require('./user.js'))

  // 错误处理函数
  app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).send({
      error,
      success: false
    })
  })
}