const fs = require('fs')
const path = require('path')

const uploadImg = function (req, res, prifix) {
  fs.readFile(req.file.path, (err, data) => {
    if (err) return res.send('图片上传失败！')
    // 声明图片名字为时间戳和随机数拼接成的，文件名保证唯一性
    const time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222)
    // 扩展名
    const extname = req.file.mimetype.split('/')[1]
    // 拼接成完整的文件名
    const fileName = time + '.' + extname

    /* 
      fs.writeFile三个参数
      1. 图片的路径
      2. 写入的内容
      3. 回调函数
    */

    fs.writeFile(path.join(__dirname, '../public/'+ prifix +'/' + fileName), data, (err) => {
      if (err) return res.send('图片写入失败')
      // const data = path.join(__dirname, '../public/avatar/' + fileName)
      const data = prifix + '/' + fileName
      res.send({
        status: 200,
        msg: '上传成功， 手动拼接根路径哦',
        data
      })
    })
  })
}

module.exports = uploadImg