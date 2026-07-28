const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require('../modules/Books');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

//Get All Books (public)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const bookList = await Book.find().populate('author', [
      '_id',
      'firstName',
      'lastName',
    ]);
    res.status(200).json(bookList);
  })
);

//Get Book By Id (public)
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'book not found' });
    }
  })
);

//Add New Book (privet)
router.post(
  '/',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
    });
    const result = book.save();
    res.status(201).json(result);
  })
);

//Update Book (privet)
router.put(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
        },
      },
      { new: true }
    );
    res.status(200).json(book);
  })
);

//Delete Book (privet)
router.delete(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'book have been deleted' });
    } else {
      res.status(404).json({ message: 'book not found' });
    }
  })
);

module.exports = router;
