const bcrypt = require('bcryptjs')
const db = require('../db')
const { customAlphabet } = require('nanoid/async')
const { lowercase } = require('nanoid-dictionary')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const { sendMail } = require('../utils/mail')
const { secretKey } = require('../config')

// 设置为随机生成 4 位 小写字母
const getCode = customAlphabet(lowercase, 4)

// 发送验证码的回调
exports.getVerCode = async (req, res) => {
  try {
    // 随机生成验证码
    const valiCode = await getCode()
    // 返回加密后的验证码
    const secretCode = jwt.sign({ valiCode }, secretKey, { expiresIn: '120s' })
    // 发送邮件
    await sendMail(req.body.account, '验证码不要泄露出去哦，有效期3分钟！', valiCode)
    res.send({
      status: 0,
      msg: 'success',
      data: secretCode
    })
  } catch (err) {
    res.cc(err)
  }
}

// 注册的回调函数
exports.regsiter = async (req, res) => {
  try {
    // 还原加密的验证码
    const { valiCode } = await jwt.verify(req.body.secretCode, secretKey)
    // 还原后的验证码与用户填写的验证码作比较，错误则报错，正确进行下面的流程
    if (valiCode !== req.body.valiCode) return res.cc('验证码错误')
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
  } catch (err) {
    res.cc(err,223)
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

// 登录的回调函数
exports.login = async (req, res) => {
  try {
    const selSql = 'SELECT * FROM account WHERE account = ?'
    const [selRes] = await db.query(selSql, req.body.account)
    if (selRes.length !== 1) return res.cc('账号错误')
    // 对比用户填写的密码和服务器存储的密码
    const compareRes = await bcrypt.compare(req.body.password, selRes[0].password)
    if (!compareRes) return res.cc('密码错误')
    const userinfo = {
      ...selRes[0],
      password: ''
    }
    // 生成token
    const token = jwt.sign(userinfo, secretKey, { expiresIn: '24h' })
    res.send({
      status: 0,
      msg: '登录成功',
      data: {
        id: selRes[0].id,
        identity: selRes[0].identity,
        token: 'Bearer ' + token
      }
    })
  } catch (err) {
    res.send(err)
  }
}

// 找回密码的回调函数
exports.retrievePwd = async (req, res) => {
  try {
    // 检查验证码是否正确
    const { valiCode } = await jwt.verify(req.body.secretCode, secretKey)
    if (valiCode !== req.body.valiCode) return res.cc('验证码错误')
    // 检查账号是否正确
    const selSql = 'SELECT * FROM account WHERE account = ?'
    const [selRes] = await db.query(selSql, req.body.account)
    if (selSql.length === 0) return res.cc('账号错误')
    // 比较新旧密码是否相同
    const compareRes = await bcrypt.compare(req.body.newPwd, selRes[0].password)
    if (compareRes) return res.cc('新密码不能和旧密码相同')
    // 加密密码
    const hashPwd = await bcrypt.hash(req.body.newPwd, 10)
    // 修改密码
    const updSql = 'UPDATE account SET ? WHERE id = ?'
    const pwdInfo = { password: hashPwd }
    const [updRes] = await db.query(updSql, [pwdInfo, selRes[0].id])
    if (updRes.affectedRows !== 1) return res.cc('修改密码失败')
    res.cc('修改密码成功', 0)
  } catch (err) {
    res.cc(err)
  }
}