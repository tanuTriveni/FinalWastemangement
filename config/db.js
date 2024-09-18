const mongoose = require('mongoose');
const colors = require('colors');  // Ensure you have colors installed using 'npm install colors'
const dotenv = require('dotenv');

// Load environment variables from `.env` file
dotenv.config();

const connectDB = async () => {
  try {
    // Use the environment variable for MongoDB URL
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb connected: ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue: ${error.message}`.bgRed.white);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
