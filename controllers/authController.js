const bcrypt = require('bcryptjs');
const asyncHundler = require('express-async-handler');
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require('../modules/User');

//Register User
const registerUser = asyncHundler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: 'user already exist' });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const result = await user.save();
  const token = user.generateToken;
  const { password, ...other } = result._doc;
  return res.status(201).json({ ...other, token });
});

//Login User
const loginUser = asyncHundler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'invalid email or password' });
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'invalid email or password' });
  }

  const token = user.generateToken;
  const { password, ...other } = user._doc;
  return res.status(200).json({ ...other, token });
});

module.exports = {
  registerUser,
  loginUser,
};
