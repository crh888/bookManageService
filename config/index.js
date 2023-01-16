const mysqlConfig = {
  host: '127.0.0.1',
  port: 3306,
  database: 'bookmanage',
  user: 'root',
  password: 'root',
}

// 加密token的key
const key = 'itbaima No.1 ^_^ @'

exports.mysqlConfig = mysqlConfig
exports.secretKey = key