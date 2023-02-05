const Joi = require('joi')

const account = Joi.string().email().required()
const id = Joi.number()
const identity = Joi.number()
const password = Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/).required() // 强密码类型 必须包含大、小写字母、数字， 可选下划线

const idAndIdenRequired = Joi.number().required()

const register = {
  body: {
    account, 
    id,
    identity,
    password // 强密码类型 必须包含大、小写字母、数字， 可选下划线
  }
}

const deleteByid_schema = {
  body: {
    id
  }
}

const alter_permission_schema = {
  body: {
    identity: idAndIdenRequired,
    id: idAndIdenRequired
  }
}

module.exports = {
  register,
  deleteByid_schema,
  alter_permission_schema
}