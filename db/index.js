const mysql = require('mysql2')
const {mysqlConfig} = require('../config')

const db = mysql.createPool(mysqlConfig)

module.exports = db.promise()
