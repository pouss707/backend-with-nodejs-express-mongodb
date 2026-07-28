const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const { notfound, errorhandler } = require('./middlewares/errors');
const connectToDb = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

//connect to database
connectToDb();

//middlewares
app.use(express.json());
app.use(logger);

//routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

//errorhandling middlewares
app.use(notfound);
app.use(errorhandler);
