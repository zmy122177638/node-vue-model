/*
 * @Description: 验证
 * @Author: Anles
 * @Date: 2020-05-15 18:05:21
 * @LastEditors: Anles
 * @LastEditTime: 2020-05-18 15:09:53
 */ 

const valideJs = require('validator');

class Validate {
  /**
   * @param {*} isRetBol 是否使用布尔值返回值
   */
  constructor(isRetBol = true) {
    this.isRetBol = isRetBol
    this.result = null
  }
  _checkSuccess() {
    this.result = {
      success: true,
      message: 'ok'
    }
    return this.isRetBol ? true : this.result
  }
  _checkFail(rule) {
    this.result = {
      success: false,
      message: rule && rule.message || 'validator error'
    }
    return this.isRetBol ? false : this.result
  }
  isEmpty(value, rule) {
    return valideJs.isEmpty(value) ? this._checkSuccess() : this._checkFail(rule)
  }
  isEmail(value, rule) {
    return valideJs.isEmail(value) ? this._checkSuccess() : this._checkFail(rule)
  }
  isMobilePhone(value, rule) {
    return valideJs.isMobilePhone(value, 'zh-CN') ? this._checkSuccess() : this._checkFail(rule)
  }
}

module.exports = Validate