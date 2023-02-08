const express = require('express')
const path = require('path')
const cors = require('cors')
const Joi = require('joi')
const {expressjwt: expressJWT} = require('express-jwt')

const { secretKey } = require('./config')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
const cateRouter = require('./router/category')
const bookRouter = require('./router/book')
const userManageRouter = require('./router/userManage')
const affairRouter = require('./router/affair')

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

// 配置解析Token的中间件
app.use(expressJWT({
  secret: secretKey,
  algorithms: ['HS256']
}).unless({
  path: [/^\/(api)|(avatar)|(cover)\//]
}))

// 挂载静态路由（头像和封面）
app.use('/avatar', express.static(path.join(__dirname, './public/avatar')))
app.use('/cover', express.static(path.join(__dirname, './public/cover')))

// 挂载路由
app.use('/api', userRouter)
// 用户信息相关的路由
app.use('/my', userInfoRouter)
// 分类相关的路由
app.use('/cate', cateRouter)
// 图书相关的路由
app.use('/book', bookRouter)
// 用户管理相关路由
app.use('/user', userManageRouter)
// 借阅相关的路由
app.use('/affair', affairRouter)


// 全局错误中间件
app.use((err, req, res, next) => {
  // joi 数据验证错误
  if (err instanceof Joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
  // 未知错误
  res.cc(err); 
})


app.listen('9000', () => {
  console.log('service running at 127.0.0.1:9000')
})