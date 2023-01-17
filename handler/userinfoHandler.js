const db = require('../db')

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