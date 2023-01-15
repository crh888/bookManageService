const express = require('express')
const path = require('path')

const res = require('./middleware/response')

const app = express()

// 自定义响应数据中间件
app.use(res(req, res, next))

// 挂载静态路由（头像和封面）
app.use('avatar', express.static(path.join(__dirname, './public/avatar')))
app.use('avatar', express.static(path.join(__dirname, './public/cover')))



app.listen('9000', () => {
  console.log('service running at 127.0.0.1:9000')
})