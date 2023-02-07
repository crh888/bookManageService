const express = require('express')
const expressJoi = require('@escook/express-joi')
const { borrowBook, agreeBorrow, borrowList, repayBook, toBeApproved, agreeList, repayList } = require('../handler/affairHandle')
const { borrow_schema, agree_schema } = require('../schema/affairSchema')

const router = express.Router()

// 用户发起借书借阅请求
router.post('/borrow', expressJoi(borrow_schema), borrowBook)
// 管理员同意借阅请求
router.post('/agree', expressJoi(agree_schema), agreeBorrow)
// 管理员获取借阅列表
router.get('/list', borrowList)
// 用户还书
router.post('/repay', expressJoi(agree_schema), repayBook)
// 用户获取待批准借阅列表
router.get('/tbapplist', toBeApproved)
// 用户获取已批准借阅列表
router.get('/agreelist', agreeList)
// 用户获取已归还图书列表
router.get('/repaylist', repayList)

module.exports = router