const moment = require('moment')
const bcrypt = require('bcryptjs')
const {sequelize} = require('../index')
const {Sequelize, Model} = require('sequelize')

class User extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: '1000',
    autoIncrement: true
  },
  user_name: {
    type: Sequelize.STRING(64),
    comment: '用户昵称'
  },
  phone: {
    type: Sequelize.BIGINT(11),
    unique: true,
    comment: '用户手机'

  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    comment: '用户邮箱'
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 加密
      const salt = bcrypt.genSaltSync(10);
      // 生成加密密码
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue("password", psw);
    },
    allowNull: false,
    comment: '用户密码'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user'
})

module.exports = {
  User
}
