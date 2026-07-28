const mongoose = require('mongoose');

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongodb...');
  } catch (error) {
    console.log('failed to connect...', error);
  }
}

module.exports = connectToDb;
