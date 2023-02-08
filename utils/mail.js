const nodemailer = require('nodemailer')
// 引入handlebars
const handlebars = require('handlebars')
// 引入mjml方法
const mjml2html = require('mjml')
const fs = require('fs')

// 邮箱账号和密码
const authUser = 'xxxxxx'
const authPass = 'xxxxxx'

// 使用handlebars对mjml文件进行编译
const template = handlebars.compile(fs.readFileSync('./template/registerTem.mjml', 'utf8'))

const transporter = nodemailer.createTransport({
  host:'smtp.ym.163.com',
  secureConnection:true,
  port:994,
  secure:true,
  auth:{
      user: authUser,
      pass: authPass
  }
})

async function sendMail (address, title, content) {
  try {
    const code = { code: content }
    const html = mjml2html(template(code)).html
    let mailOption = {
      from: authUser,
      to: `${address}`,
      subject: `${title}`,
      html
    }
    await transporter.sendMail(mailOption,).then((res) => {
      console.log('邮件发送:' + res.response)
    })
  } catch (err) {
    console.log('邮件发送错误', err);
  }
}

exports.sendMail = sendMail
