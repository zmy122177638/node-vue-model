/*
 * @Description: 验证器
 * @Author: Anles
 * @Date: 2020-05-15 14:45:46
 * @LastEditors: Anles
 * @LastEditTime: 2020-05-18 15:15:16
 */ 

const Validate = require('./validate')

class Validator extends Validate{
  constructor(descriptor) {
    super(false)
    if (Object.prototype.toString.call(descriptor) !== '[object Object]') throw Error('【validator】descriptor参数必须为Object类型')
    this.descriptor = descriptor
    this.source = {}
  }
  async validate(source) {
    this.source = source;
    for (let key in this.descriptor) {
      /** 如果result不等于null跳出循环 */
      if (this.result !== null) break
      await this._check(key)
    }
    return this.result || this._checkSuccess()
  }
  async _check(key) {
    const rules = this.descriptor[key]
    if (Object.prototype.toString.call(rules) !== '[object Array]') throw Error('【validator】rules参数必须为Array类型')
    let value = this.source[key]
    let typeToString =  Object.prototype.toString
    for (let i = 0; i < rules.length; i++) {
      const currRule = rules[i]
      const { required, validate, pattern, alias } = currRule
      if (Array.isArray(alias)) {
        value = this.source[alias.find((item) => this.source[item] || key)]
      }
      if (required) {
        if (!value) {
          this._checkFail({message: `${key}参数必填`})
          break
        }
      }
      if (typeToString.call(pattern) === '[object RegExp]') {
        if (!pattern.test(value)) {
          this._checkFail(currRule)
          break
        }
      }
      if (typeToString.call(validate) === '[object String]') {
        if (validate in this) {
          this[validate](value, currRule)
        } else {
          console.warn('validate字段未匹配可使用method')
        }
      }
      if (typeToString.call(validate) === '[object Function]') {
        const retAsync = validate(value, currRule, (result) => {
          if(typeToString.call(result) === '[object Error]') {
            this._checkFail(result)
          }
        })
        if (typeToString.call(retAsync) === '[object Promise]') {
          try {
            await retAsync
          } catch (err) {
            if (typeToString.call(err) === '[object String]') {
              this._checkFail({message: err})
            } else {
              this._checkFail(err)
            }
          }
        }
      }
    }
  }
  
}

module.exports = Validator