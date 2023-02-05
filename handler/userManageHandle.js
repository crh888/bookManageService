const db = require('../db')
const bcrypt = require('bcryptjs')

// 查看所有用户
exports.userList = async (req, res) => {
  try {
    const sql = 'SELECT id, account, nickname, avatar FROM account, userinfo WHERE account.identity < 2 AND account.is_delete = 0 AND account.id = userinfo.account_id'
    const [results] = await db.query(sql)
    if (results.length === 0) res.cc('查询用户列表失败')
    res.send({
      status: 0,
      msg: 'success',
      data: results
    })

  } catch (err) {
    res.cc(err)
  }
}

// 新增用户
exports.addUser = async (req, res) => {
  // 查找账号是否存在
  const selSql = 'SELECT * FROM account WHERE account = ?'
  const selRes = await db.query(selSql, req.body.account)
  if (selRes[0].length !== 0) return res.cc('账号已存在')
  // 当账号可用，加密传过来的密码
  await bcrypt.hash(req.body.password, 10).then((result) => {
    req.body.password = result
  })
  const sql = 'INSERT INTO account SET ?'
  if (!req.body.id) {
    // 处理没有传入 id 的情况 查找除最大的id + 1
    const selIdSql = 'SELECT id FROM account GROUP BY id DESC'
    // 解构出来查询结果
    const [ resId ] = await db.query(selIdSql)
    if (!resId[0]) return res.cc('未知错误')
    const ret = resId[0].id
    const id = Number(ret) + 1
    const theInfo = {
      id,
      account: req.body.account,
      password: req.body.password,
    }
    const inserRes = db.query(sql, theInfo)
    if (inserRes.affectedRows === 0) return res.cc('注册失败')
    // 新增插入新用户的信息
    insertUserInfo(theInfo.id)
  } else {
    const inserRes =  db.query(sql, req.body)
    if (inserRes.affectedRows === 0) return res.cc('注册失败')
    // 新增插入新用户的信息
    insertUserInfo(req.body.id)
  }

  // 插入用户信息的方法
  async function insertUserInfo (id) {
    try {
      const info = {
        nickname: '新用户_' + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222),
        account_id: id
      }
      const sqlStr = 'INSERT INTO userinfo SET ?'
      await db.query(sqlStr, info).then(results => {
        res.cc('注册成功，新用户信息录入完毕！', 0)
      })
    } catch (err) {
      res.cc(err)
    }
  }
}

// 删除用户
exports.deleteUser = async (req, res) => {
  const deleteInfoSql = 'UPDATE userinfo SET is_delete = 1 WHERE account_id = ?'
  const [result] = await db.query(deleteInfoSql, req.body.id)
  if (result.affectedRows !== 1) return res.cc('删除用户失败')
  const deleteAccountSql = 'UPDATE account SET is_delete = 1 WHERE id = ?'
  const [result_2] = await db.query(deleteAccountSql, req.body.id)
  if (result_2.affectedRows !== 1) return res.cc('删除用户失败')
  res.cc('删除用户成功', 0)

}

// 重置用户的密码(重置为Asd000000)
exports.retrievePwd = async (req, res) => {
  try {
    const sql = 'UPDATE account SET password = ? WHERE id = ?'
    const pwd = 'Asd000000'
    const hashPwd = await bcrypt.hash(pwd, 10)
    console.log(hashPwd)
    const [result] = await db.query(sql, [hashPwd, req.body.id])
    if (result.affectedRows !== 1) return res.cc('重置用户密码失败')
    res.cc('重置用户密码成功', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 设置用户权限
exports.permissions = async (req, res) => {
  try {
    const sql = 'UPDATE account SET identity = ? WHERE id = ?'
    const [result] = await db.query(sql, [req.body.identity, req.body.id])
    if (result.affectedRows !== 1) return res.cc('修改用户权限失败')
    res.cc('修改用户权限成功', 0)
  } catch (err) {
    res.cc(err)
  }
  
}
