const Joi = require('joi')

const id = Joi.number().min(1).max(999).required()
const cateName = Joi.string().required()

const idSchema = {
  params: {
    id
  }
}

const update_schema = {
  body: {
    category_id: id,
    category_name: cateName
  }
}

module.exports = {
  idSchema,
  update_schema
}