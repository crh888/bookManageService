const Joi = require('joi')

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

exports.getValiCode_schema = {
  body: {
    account: Joi.string().email().required()
  }
}