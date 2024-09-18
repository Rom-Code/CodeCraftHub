// Import necessary modules
const User = require('../models/userModel'); // User model for interacting with the database
const bcrypt = require('bcrypt'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens

// User registration
/**
 * Handles user registration.
 * 
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object used to send responses.
 */
exports.registerUser = async (req, res) => {
  try {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' }); // Conflict status
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); // Save the new user to the database

    return res.status(201).json({ message: 'User registered successfully' }); // Created status
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' }); // Server error
  }
};

// User login
/**
 * Handles user login.
 * 
 * @param {Object} req - The request object containing login credentials.
 * @param {Object} res - The response object used to send responses.
 */
exports.loginUser = async (req, res) => {
  try {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Check if the username exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Unauthorized status
    }

    // Check if the provided password matches the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Unauthorized status
    }

    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign(
      { username: existingUser.username }, // Payload
      '77a90f8b6805fe61cd3a882c47ed5317b02d9e2c17959fa17d686baf0916bb70', // Secret key (should be in env variable)
      { expiresIn: '1h' } // Token expiration time
    );

    return res.status(200).json({ token }); // Success status with the token
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' }); // Server error
  }
};

// User profile management
/**
 * Updates the user's profile.
 * 
 * @param {Object} req - The request object containing new user data.
 * @param {Object} res - The response object used to send responses.
 */
exports.updateUserProfile = async (req, res) => {
  try {
    // Extract the username from the request parameters
    const { username } = req.params;
    const { newUsername } = req.body; // New username from the request body

    // Update the user's username in the database
    await User.updateOne({ username }, { username: newUsername });

    return res.status(200).json({ message: 'User profile updated successfully' }); // Success status
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' }); // Server error
  }
};
