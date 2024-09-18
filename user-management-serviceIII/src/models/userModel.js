// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String, // The type of the field is String
    required: true, // This field is required
    unique: true, // The username must be unique across users
  },
  password: {
    type: String, // The type of the field is String
    required: true, // This field is required
  },
});

// Create a Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
