const res = function response(req, res, next) {
  // status 为 0 是成功，1 是失败，默认值为 1 方便处理错误请求
  res.cc = (err, status = 1) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  // 处理完放行
  next()
}

module.exports = res