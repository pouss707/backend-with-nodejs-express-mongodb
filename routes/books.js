const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// /api/books
router.route('/').get(getAllBooks).post(verifyTokenAndAdmin, addNewBook);

// /api/books/id
router
  .route('/:id')
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;
