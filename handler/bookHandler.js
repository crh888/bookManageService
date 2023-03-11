const db = require('../db')
const uploadImg = require('../utils/uploadImg')

// 获取所有的图书列表
exports.getBookList = async (req, res) => {
  try {
    const sql = 'SELECT * FROM book WHERE is_delete = 0'
    const [results] = await db.query(sql)
    if (results.length === 0) return res.cc('查询所有图书失败')
    res.send({
      status: 0,
      msg: 'success',
      data: results
    })
  } catch (err) {
    res.cc(err)
  }
}

// 按照书名获取图书
exports.getBookByName = async (req, res) => {
try {
  const sql = `SELECT * FROM book WHERE book_name LIKE "%${req.params.bookname}%" AND is_delete = 0`
  const [results] = await db.query(sql)
  if (results.length === 0) return res.cc('无法查询出该图书，请更换关键词')
  res.send({
    status: 0,
    msg: 'success',
    data: results
  })
} catch (err) {
  res.cc(err)
}
}

// 按照分类查找图书列表
exports.getBookListByName = async (req, res) => {
  try {
    const sql = `SELECT * FROM book WHERE cate_id = ${req.params.id} AND is_delete = 0`
    const [results] = await db.query(sql)
    if (results.length === 0) return res.cc('该分类下无图书')
    res.send({
      status: 0,
      msg: 'success',
      data: results
    })
  } catch (err) {
    res.cc(err)
    
  }
  
}

// 按 id 获取指定图书信息
exports.getBookById = async (req, res) => {
  try {
    const sql = 'SELECT * FROM book WHERE book_id = ? AND is_delete = 0'
    const [result] = await db.query(sql, req.params.id)
    console.log(result);
    if (result.length === 0) return res.cc('获取图书信息失败')
    res.send({
      status: 0,
      msg: 'success',
      data: result[0]
    })
  } catch (err) {
    res.cc(err)
  }
}

// 修改图书信息
exports.updateBookInfo = async (req, res) => {
  try {
    // 判断新图书名字是否已存在
    const selSql = 'SELECT * FROM book WHERE book_id = ?'
    const [result] = await db.query(selSql, req.body.book_id)
    if (req.body.book_name === result[0].book_name) {
      const updSql = 'UPDATE book SET ? WHERE book_id = ?'
      const [updRes] = await db.query(updSql, [req.body, req.body.book_id])
      if (updRes.affectedRows !== 1) return res.cc('修改图书信息失败')
      res.cc('修改图书信息成功', 0)
    } else {
      const againSel = 'SELECT * FROM book WHERE book_name = ? AND is_delete = 0'
      const [results] = await db.query(againSel, req.body.book_name)
      if (results.length === 1) return res.cc('图书名称已被占用')
      const updSql = 'UPDATE book SET ? WHERE book_id = ?'
      const [updRes] = await db.query(updSql, [req.body, req.body.book_id])
      if (updRes.affectedRows !== 1) return res.cc('修改图书信息失败')
      res.cc('修改图书信息成功', 0)
    }
    
    
  } catch (err) {
    res.cc(err)
  }
}

// 新增图书信息
exports.addBook = async (req, res) => {
  try {
    // 查找书名是否相同
    const selSql = 'SELECT * FROM book WHERE book_name = ? AND is_delete = 0'
    const [selRes] = await db.query(selSql, req.body.book_name)
    if (selRes.length === 1) return res.cc('书名已存在')
    const insSql = 'INSERT INTO book SET ?'
    const [insRes] = await db.query(insSql, req.body)
    if (insRes.affectedRows !== 1) return res.cc('添加图书信息失败')
    res.cc('添加信息成功', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 删除图书
exports.deleteBook = async (req, res) => {
  try {
    const sql = 'UPDATE book SET is_delete = 1 WHERE book_id = ?'
    const [result] = await db.query(sql, req.params.id)
    if (result.affectedRows !== 1) return res.cc('删除图书失败')
    res.cc('删除图书成功', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 上传封面
exports.uploadCover = (req, res) => {
  uploadImg(req, res, 'cover')
}