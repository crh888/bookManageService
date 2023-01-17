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