const db = require('../db')
const dayjs = require('dayjs')

// 用户发起借阅请求
exports.borrowBook = async (req, res) => {
  try { 
    const info = {
      book_id: req.body.book_id,
      account_id: req.auth.id,
    }
    const sql = 'INSERT INTO affair SET ?'
    const [result] = await db.query(sql, info)
    if (result.affectedRows === 0) return res.cc('发起借阅请求失败')
    res.cc('发起借阅请求成功', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 管理员同意借阅请求
exports.agreeBorrow = async (req, res) => {
  try {
    const sql = 'UPDATE affair SET ? WHERE affair_id = ?'
    // 获取当前时间
    // dayjs() 表示为当前时间
    // add() 增加的天数 返回一个字符串
    const dueDate = dayjs().add(14, 'day').format('YYYY-MM-DD')
    const info = {
      status: 1,
      due: dueDate
    }
    const [result] = await db.query(sql, [info, req.body.affair_id])
    if (result.affectedRows === 0) return res.cc('批准借阅请求失败')
    res.cc('批准借阅', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 管理员获取借阅列表
exports.borrowList = async (req, res) => {
  try {
    const sql = 'SELECT affair_id, nickname, book_name, cover FROM affair, userinfo, book WHERE affair.`status` = 0 AND affair.account_id = userinfo.account_id AND affair.book_id = book.book_id'
    const [results] = await db.query(sql)
    if (results.length === 0) return res.cc('获取借阅列表信息失败')
    res.send({
      status: 0,
      msg: 'success',
      data: results
    })
  } catch (err) {
    res.cc(err)
  }
}

// 用户还书
exports.repayBook = async (req, res) => {
  try {
    const sql = 'UPDATE affair SET ? WHERE affair_id = ?'
    const info = {
      status: 2,
      due: ''
    }
    const [result] = await db.query(sql, [info, req.body.affair_id])
    if (result.affectedRows === 0) return res.cc('还书失败')
    res.cc('还书成功', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 用户获取待批准借阅列表
exports.toBeApproved = (req, res) => {
  selectStatusList(req, res, 0, '待批准')
}

// 用户获取已批准借阅列表
exports.agreeList = (req, res) => {
  selectStatusList(req, res, 1, '已批准', ',due')
}

// 用户获取已归还图书列表
exports.repayList = (req, res) => {
  selectStatusList(req, res, 2, '已归还')
}

// 定义用户查询请求状态列表的方法
async function selectStatusList (req, res, status, mesg, due = '') {
  try {
    const sql = `SELECT affair_id, book_name, author, cover${due} FROM affair, userinfo, book WHERE affair.\`status\` = ${status}  AND affair.account_id = userinfo.account_id AND affair.book_id = book.book_id AND affair.account_id = ?`
    const [results] = await db.query(sql, req.auth.id)
    if (results.length < 0) return res.cc('查询' + mesg + '列表失败')
    res.send({
      status: 0,
      msg: 'success',
      data: results
    })
  } catch (err) {
    res.cc(err)
  }
}
