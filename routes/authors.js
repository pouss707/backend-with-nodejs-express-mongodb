const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require('../modules/Authors');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

//Get All Authors (public)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  })
);

//Get Author By Id (public)
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'author not found' });
    }
  })
);

//Add New Author (privet)
router.post(
  '/',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
    });
    const result = await author.save();
    res.status(201).json(result);
  })
);

//update Author (privet)
router.put(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
      res.status(400).json(error);
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
        },
      },
      { new: true }
    );
    res.status(200).json(author);
  })
);

//Delete Author (privet)
router.delete(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'author have been deleted' });
    } else {
      res.status(404).json({ message: 'author not found' });
    }
  })
);

module.exports = router;
