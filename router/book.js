const express = require('express')
const expressJoi = require('@escook/express-joi')
const { getBookList, getBookById, updateBookInfo, addBook, deleteBook, uploadCover } = require('../handler/bookHandler')
const { idSchema, updateBookInfo_schema, addBook_schema } = require('../schema/bookSchema')
const upload = require('../middleware/upload')

const router = express.Router()

// 获取所有图书列表
router.get('/list', getBookList)
// 按 id 获取图书信息
router.get('/:id', expressJoi(idSchema), getBookById)
// 修改图书信息
router.post('/update', expressJoi(updateBookInfo_schema), updateBookInfo)
// 新增图书信息
router.post('/addbook', expressJoi(addBook_schema), addBook)
// 删除图书信息
router.get('/delete/:id', expressJoi(idSchema), deleteBook)
// 上传图书封面
router.post('/uploadcover', upload.single('cover'), uploadCover)

module.exports = router