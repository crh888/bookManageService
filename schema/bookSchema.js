const Joi = require('joi')

const id = Joi.number().min(1).max(999).required()
const name = Joi.string()
const id_upd = Joi.number().min(1).max(999)


const idSchema = {
  params: {
    id
  }
}
const updateBookInfo_schema = {
  body: {
    book_id: id_upd,
    book_name: name,
    cover: name,
    author: name,
    cate_id: id_upd,
  }
}

const addBook_schema = {
  body: {
    book_name: name,
    cover: name,
    author: name,
    cate_id: id_upd,
  }
}

module.exports = {
  idSchema,
  updateBookInfo_schema,
  addBook_schema
}