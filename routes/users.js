const express = require('express');
const router = express.Router();
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

// /api/users
router.get('/', verifyTokenAndAdmin, getAllUsers);

// /api/users/id
router
  .route('/:id')
  .get(verifyTokenAndAuth, getUserById)
  .put(verifyTokenAndAuth, updateUser)
  .delete(verifyTokenAndAuth, deleteUser);

module.exports = router;
