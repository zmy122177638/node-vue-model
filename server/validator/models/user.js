
const ValidateRuctor = require('../validate')
const Validate = new ValidateRuctor()
const regLogin = {
  account: [
    {
      required: true, validate: (value, rule, cb) => {
        if (Validate.isMobilePhone(value) || Validate.isEmail(value)) {
          cb()
        } else {
          cb(new Error('账号格式错误'))
        }
      },
      alias: ['email', 'phone']
    }
  ],
  password: [
    { required: true }
  ]
}


module.exports = {
  regLogin
}