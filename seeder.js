const { Book } = require('./modules/Books');
const { Author } = require('./modules/Authors');
const { books, authors } = require('./data');
const connectionToDb = require('./config/db');
require('dotenv').config();

//connection de DB
connectionToDb();

//Import Books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log('books imported');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Import Athors
const importAthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log('authors imported');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Delete Books
const deleteBooks = async () => {
  try {
    await Book.deleteMany();
    console.log('books deleted');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Delete Athors
const deleteAthors = async () => {
  try {
    await Author.deleteMany();
    console.log('Athors deleted');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//process
if (process.argv[2] === '-import') {
  importBooks();
} else if (process.argv[2] === '-remove') {
  deleteBooks();
} else if (process.argv[2] === '-import-authors') {
  importAthors();
}
