const express = require('express')
const expressJoi = require('@escook/express-joi')
const { userList, addUser, deleteUser, retrievePwd, permissions } = require('../handler/userManageHandle')
const { register, deleteByid_schema, alter_permission_schema } = require('../schema/userManageSchema')


const router = express.Router()

// 查看所有用户
router.post('/list', userList)
// 新增用户
router.post('/adduser', expressJoi(register), addUser)
// 删除用户
router.post('/delete', expressJoi(deleteByid_schema), deleteUser)
// 重置用户的密码
router.post('/retrievepwd', expressJoi(deleteByid_schema), retrievePwd)
// 修改用户权限
router.post('/permission',expressJoi(alter_permission_schema), permissions)

module.exports = router