const Sequelize = require('sequelize')

const {
  database,
  host,
  port,
  user,
  password
} = require('../../config').mysql

const sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    // create_time && update_time
    timestamps: true,
    // delete_time
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true,
  }
})
// 创建模型
sequelize.sync({force: false})
module.exports = {
  sequelize
}