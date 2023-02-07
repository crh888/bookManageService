const Joi = require('joi')

const id = Joi.number().required()

const borrow_schema = {
  body: {
    book_id: id
  }
}

const agree_schema = {
  body: {
    affair_id: id
  }
}

module.exports = {
  borrow_schema,
  agree_schema
}