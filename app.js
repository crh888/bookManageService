const express = require('express')
const path = require('path')
const cors = require('cors')
const Joi =require('joi')

const userRouter = require('./router/user')

const app = express()

// 配置 cors 跨域
app.use(cors())

// 配置解析表单数据的中间件, 注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({
  extended: false
}))

// 自定义响应数据中间件
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  // 处理完放行
  next()
})

// 挂载静态路由（头像和封面）
app.use('avatar', express.static(path.join(__dirname, './public/avatar')))
app.use('avatar', express.static(path.join(__dirname, './public/cover')))

// 挂载路由
app.use('/api', userRouter)

// 全局错误中间件
app.use((err, req, res, next) => {
  // joi 数据验证错误
  if (err instanceof Joi.ValidationError) return res.cc(err)
})


app.listen('9000', () => {
  console.log('service running at 127.0.0.1:9000')
})