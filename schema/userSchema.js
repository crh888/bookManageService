const Joi = require('joi')

// 注册的表单验证
exports.register_schema = {
  body: {
    account: Joi.string().email().required(),
    id: Joi.string(),
    identity: Joi.number(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/).required(), // 强密码类型 必须包含大、小写字母、数字， 可选下划线
    valiCode: Joi.string().max(4).required(),
    secretCode: Joi.string().required()
  }
}

// 邮箱号码的表单验证
exports.getValiCode_schema = {
  body: {
    account: Joi.string().email().required()
  }
}

// 登录的表单验证
exports.login_schema = {
  body: {
    account: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/).required()
  }
}

// 找回密码的表单验证
exports.retrieve_schema = {
  body: {
    account: Joi.string().email().required(),
    newPwd: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/).required(),
    valiCode: Joi.string().max(4).required(),
    secretCode: Joi.string().required()
  }
}
