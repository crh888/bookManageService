const express = require('express')
const expressJoi = require('@escook/express-joi')

const upload = require('../middleware/upload')

const {
  updateUserInfo_schema, updatePwd_schema, updateAvatar_schema
} = require('../schema/userInfoSchema')

const {
  GetUserInfo, updateUserinfo, updatePwd, uploadAvatar, updateAvatar
} = require('../handler/userinfoHandler')
const router = express.Router()

router.get('/userinfo', GetUserInfo)

router.post('/updateuserinfo', expressJoi(updateUserInfo_schema), updateUserinfo)

// 修改密码
router.post('/updatepwd', expressJoi(updatePwd_schema), updatePwd)

// 上传头像
router.post('/uploadavatar', upload.single('avatar'), uploadAvatar)

// 更新头像
router.post('/updateavatar', expressJoi(updateAvatar_schema), updateAvatar)

module.exports = router