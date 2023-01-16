const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const { 
  regsiter,
  getVerCode
 } = require('../handler/userHandler')
const {
  register_schema,
  getValiCode_schema
} = require('../schema/userSchema')

// 获取验证码
router.post('/getvercode', expressJoi(getValiCode_schema), getVerCode)

// 注册
router.post('/register', expressJoi(register_schema), regsiter)

module.exports = router