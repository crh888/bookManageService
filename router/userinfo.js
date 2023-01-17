const express = require('express')
const expressJoi = require('@escook/express-joi')

const {
  updateUserInfo_schema
} = require('../schema/userInfoSchema')

const {
  GetUserInfo, updateUserinfo
} = require('../handler/userinfoHandler')
const router = express.Router()

router.get('/userinfo', GetUserInfo)

router.post('/updateuserinfo', expressJoi(updateUserInfo_schema), updateUserinfo)

module.exports = router