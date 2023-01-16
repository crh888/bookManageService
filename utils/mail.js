const nodemailer = require('nodemailer')

const authUser = 'bmadmin@1crh.cn'
const authPass = 'book123'

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
    let mailOption = {
      from: authUser,
      to: `${address}`,
      subject: `${title}`,
      text: `${content}`
    }
    await transporter.sendMail(mailOption,).then((res) => {
      console.log('邮件发送:' + res.response)
    })
  } catch (err) {
    console.log('邮件发送错误', err);
  }
}

exports.sendMail = sendMail