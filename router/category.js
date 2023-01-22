const express = require('express')
const expressJoi = require('@escook/express-joi')
const { getCateList, getCateListById, addCategory, updateCategory, deleteCate } = require('../handler/cateHanlder')
const { idSchema, update_schema } = require('../schema/cateSchema')

const router = express.Router()

// 获取全部分类信息列表
router.get('/list', getCateList)
// 按 id 获取某个分类信息
router.get('/:id', expressJoi(idSchema), getCateListById)
// 新增分类信息
router.post('/addcate', addCategory)
// 修改分类信息
router.post('/updatecate', expressJoi(update_schema), updateCategory)
// 按照 id 删除分类信息
router.get('/delete/:id', expressJoi(idSchema), deleteCate)

module.exports = router