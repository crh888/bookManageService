const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const { 
  regsiter,
  getVerCode,
  login,
  retrievePwd
 } = require('../handler/userHandler')
const {
  register_schema,
  getValiCode_schema,
  login_schema,
  retrieve_schema
} = require('../schema/userSchema')

// 获取验证码
router.post('/getvercode', expressJoi(getValiCode_schema), getVerCode)

// 注册
router.post('/register', expressJoi(register_schema), regsiter)

// 登录
router.post('/login', expressJoi(login_schema), login)

// 找回密码
router.post('/retrievepwd', expressJoi(retrieve_schema), retrievePwd)

module.exports = router