const db = require('../db')
const bcrypt = require('bcryptjs')

exports.GetUserInfo = async (req, res) => {
  try {
    // console.log(req.auth)
    const sql = 'SELECT info_id, nickname, gender, birthday, avatar FROM userinfo WHERE account_id = ?'
    const [result] = await db.query(sql, req.auth.id)
    if (!result) return res.cc('查询用户信息失败')
    res.send({
      status: 0,
      msg: 'success',
      data: result[0]
    })
  } catch (err) {
    res.cc(err)    
  }
}

// 更新用户信息
exports.updateUserinfo = async (req, res) => {
  try {
    const sql = 'UPDATE userinfo SET ? WHERE info_id = ?'
    const [result] = await db.query(sql, [req.body, req.body.info_id])
    if (result.affectedRows !== 1) res.cc('更新用户信息失败')
    res.cc('更新用户信息成功', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 更新密码
exports.updatePwd = async (req, res) => {
  try {
    // 查找原密码
    const selSql = 'SELECT password FROM account WHERE id = ?'
    const [selRes] = await db.query(selSql, req.auth.id)
    // 与用户填写的原密码进行比较
    const compareRes = await bcrypt.compare(req.body.oldPwd, selRes[0].password)
    if (!compareRes) return res.cc('原密码错误！')
    // 判断新旧密码是否相同
    if(req.body.oldPwd === req.body.newPwd) return res.cc('新旧密码不能相同！')
    // 加密新密码
    const hashPwd = await bcrypt.hash(req.body.newPwd, 10)
    const updSql = 'UPDATE account SET ? WHERE id = ?'
    const info = {
      password: hashPwd
    }
    const [updRes] = await db.query(updSql, [info, req.auth.id])
    if (updRes.affectedRows !== 1) return res.cc('修改密码时发送错误')
    res.cc('修改密码成功', 0)
  } catch (err) {
    res.cc(err)
  }
}