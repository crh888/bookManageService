const express = require('express')
const expressJoi = require('@escook/express-joi')
const { userList, addUser, deleteUser, retrievePwd, permissions, userAccount } = require('../handler/userManageHandle')
const { register, deleteByid_schema, alter_permission_schema, user_account_schema } = require('../schema/userManageSchema')


const router = express.Router()

// 查看所有用户
router.post('/list', userList)
// 根据邮箱账号查询用户
router.post('/account', expressJoi(user_account_schema), userAccount)
// 新增用户
router.post('/adduser', expressJoi(register), addUser)
// 删除用户
router.post('/delete', expressJoi(deleteByid_schema), deleteUser)
// 重置用户的密码
router.post('/retrievepwd', expressJoi(deleteByid_schema), retrievePwd)
// 修改用户权限
router.post('/permission',expressJoi(alter_permission_schema), permissions)

module.exports = router