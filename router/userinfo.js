const express = require('express')
const expressJoi = require('@escook/express-joi')

const {
  updateUserInfo_schema, updatePwd_schema
} = require('../schema/userInfoSchema')

const {
  GetUserInfo, updateUserinfo, updatePwd
} = require('../handler/userinfoHandler')
const router = express.Router()

router.get('/userinfo', GetUserInfo)

router.post('/updateuserinfo', expressJoi(updateUserInfo_schema), updateUserinfo)

// 修改密码
router.post('/updatepwd',expressJoi(updatePwd_schema), updatePwd)

module.exports = router