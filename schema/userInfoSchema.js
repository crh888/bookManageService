const Joi = require('joi')

const updateUserInfo_schema = {
  body: {
    info_id: Joi.number().max(5),
    nickname: Joi.string().max(30),
    gender: Joi.number().max(1),
    birthday: Joi.string(),
    avatar: Joi.string()
  }
}

module.exports = {
  updateUserInfo_schema
}