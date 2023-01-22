const db = require('../db')


// 获取所有分类
exports.getCateList = async (req, res) => {
  try {
    const sql = 'SELECT * FROM category WHERE is_delete = 0'
    const [results] = await db.query(sql)
    if (results.lenth === 0) return res.cc('查询分类失败')
    res.send({
      status: 0,
      msg: 'success',
      data: results
    })
  } catch (err) {
    res.cc(err)
  }
}

// 按照 id 获取指定分类信息
exports.getCateListById = async (req, res) => {
  try {
    const sql = 'SELECT * FROM category WHERE category_id = ? AND is_delete = 0'
    const [result] = await db.query(sql, req.params.id)
    if (result.length === 0) res.cc('查询该分类失败')
    res.send({
      status: 0,
      msg: 'success',
      data: result[0]
    })
  } catch (err) {
    res.cc(err)
  }

}

// 新增分类
exports.addCategory = async (req, res) => {
  try {
    // 查找分类名是否存在
    const selSql = 'SELECT * FROM category WHERE category_name = ?'
    const [result] = await db.query(selSql, req.body.category_name)
    if (result.length === 1) return res.cc('分类名已存在')
    const insSql = 'INSERT INTO category SET ?'
    const [results] = await db.query(insSql, req.body)
    if (results.affectedRows !== 1) return res.cc('添加分类名错误')
    res.cc('添加分类信息成功', 0)
  } catch (err) {
    res.cc(err)
  }
} 

// 修改分类
exports.updateCategory = async (req, res) => {
  try {
    // 查询修改的名字有没有被占用
    const selSql = 'SELECT * FROM category WHERE category_name = ? AND is_delete = 0'
    const [sqlRes] = await db.query(selSql, req.body.category_name)
    // 将修改的名字转存以下便于提示
    const name = req.body.category_name
    if (sqlRes.length === 1) return res.cc(`当前分类名：${name} 不可用`)
    const sql = 'UPDATE category SET ? WHERE category_id = ?'
    const [ress] = await db.query(sql, [req.body, req.body.category_id])
    if (ress.affectedRows !== 1) return res.cc('修改分类信息失败')
    res.cc('修改分类信息成功', 0)
  } catch (err) {
    res.cc(err)
  }
}

// 按照 id 删除分类信息 逻辑删除
exports.deleteCate = async (req, res) => {
  try {
    const sql = 'UPDATE category SET is_delete = 1 WHERE category_id = ?'
    const [ress] = await db.query(sql, req.params.id)
    if (ress.affectedRows !== 1) return res.cc('分类信息删除失败')
    res.cc('删除分类信息成功', 0)
  } catch (err) {
    res.cc(err)
  }
}
