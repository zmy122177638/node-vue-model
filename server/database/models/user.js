const { User } = require('../../plugins/sequelize/models/user')
const bcrypt = require('bcryptjs')
class UserModel {
  /**
   * @description: 获取用户信息
   * @param {String} id 用户id
   * @return: 用户信息
   */
  static getInfo(id) {
    return User.findOne({where: {id}})
  }
  /**
   * @description: 新增用户 
   * @param {Object} params 必填用户数据
   * @return: 用户信息
   */
  static async create(params) {
    const accountKey = params.email ? 'email' : 'phone'
    const isFind = await User.findOne({where: { [accountKey]: params[accountKey] }})
    if (isFind) {
      const title = info.phone ? '手机号' : '邮箱'
      global.throw(400, `该${title}已注册`)
    } else {
      return await User.create({
        [accountKey]: params[accountKey],
        password: params.password
      })
    }
  }
  /**
   * @description 修改用户密码
   * @param {*} id 用户ID
   * @param {*} oldPsd 旧密码
   * @param {*} newPsd 新密码
   */
  static async modifyPassword(id, oldPsd, newPsd) {
    let userInfo = await this.getInfo(id)
    if (userInfo) {
      const checkPsw = bcrypt.compareSync(oldPsd, userInfo.password)
      if (checkPsw) {
        userInfo.password = newPsd
        return (await userInfo).save()
      } else {
        global.throw(400, '旧密码错误')
      }
    } else {
      global.throw(400, '未找到用户')
    }
  }
  /**
   * @description: 查询用户 
   * @param {Object} params 用户数据
   * @return  用户信息 OR null
   */
  static queryOne(params) {
    return User.findOne({where: params})
  }
}

module.exports = UserModel