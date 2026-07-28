const { required } = require('joi');
const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 500,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      minlength: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(50).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(obj);
}
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(50),
    author: Joi.string(),
    description: Joi.string().trim().min(3).max(500),
    price: Joi.number().min(0),
  });
  return schema.validate(obj);
}

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
