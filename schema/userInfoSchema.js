const Joi = require('joi')

const updateUserInfo_schema = {
  body: {
    info_id: Joi.number().max(100000),
    nickname: Joi.string().max(30),
    gender: Joi.number().max(1),
    birthday: Joi.string(),
    avatar: Joi.string()
  }
}

const updatePwd_schema = {
  body: {
    oldPwd: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/).required(),
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则  
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/).required())
 }
}

const updateAvatar_schema = {
  body: {
    avatar: Joi.string().required()
  }
}

module.exports = {
  updateUserInfo_schema,
  updatePwd_schema,
  updateAvatar_schema
}