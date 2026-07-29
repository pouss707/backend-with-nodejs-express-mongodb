const bcrypt = require('bcryptjs');
const asyncHundler = require('express-async-handler');
const { User, validateUpdateUser } = require('../modules/User');

//Get All Users
const getAllUsers = asyncHundler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

//Get User By Id
const getUserById = asyncHundler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});

//Update User
const updateUser = asyncHundler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

//Delete User
const deleteUser = asyncHundler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'user have been deleted succesfully' });
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
