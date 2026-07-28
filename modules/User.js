const { required } = require('joi');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
      maxlength: 100,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//User Module
const User = mongoose.model('User', userSchema);

//Generate Token
userSchema.methods.gererateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};

//Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(8).max(100).required().email(),
    username: Joi.string().trim().min(8).max(100).required(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

//Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(8).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

//Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(8).max(100).email(),
    username: Joi.string().trim().min(8).max(100),
    password: Joi.string().trim().min(8),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
