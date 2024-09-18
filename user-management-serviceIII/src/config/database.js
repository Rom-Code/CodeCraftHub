// Import necessary modules
const mongoose = require('mongoose'); // Mongoose is an ODM for MongoDB
const User = require('../models/userModel'); // Import User model (if needed elsewhere)

// Load environment variables from .env file
require('dotenv').config();

/**
 * Connect to the MongoDB database.
 * This function establishes a connection to the database
 * using Mongoose and handles any connection errors.
 *
 * @returns {Promise<void>} - A promise that resolves when the connection is successful.
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Use the new URL string parser
      useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
    });
    
    console.log('MongoDB connected'); // Log a success message
  } catch (error) {
    // Log any connection errors and exit the process
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application with an error code
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
