const express = require('express')

const {
  GetUserInfo
} = require('../handler/userinfoHandler')
const router = express.Router()

router.get('/userinfo', GetUserInfo)

module.exports = router