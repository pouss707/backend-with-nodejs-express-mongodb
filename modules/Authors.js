const { required } = require('joi');
const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model('Author', AuthorSchema);

function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50).required(),
    lastName: Joi.string().trim().min(3).max(50).required(),
    nationality: Joi.string().trim().min(3).max(50).required(),
  });
  return schema.validate(obj);
}
function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50),
    lastName: Joi.string().trim().min(3).max(50),
    nationality: Joi.string().trim().min(3).max(50),
  });
  return schema.validate(obj);
}

module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
};
