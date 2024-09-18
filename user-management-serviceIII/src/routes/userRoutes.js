// Import the Express framework
const express = require('express');
// Create a new router object using Express Router
const router = express.Router();
// Import the user controller containing the logic for user operations
const userController = require('../controllers/userController');

// Define a POST route for user registration
// When a request is made to '/register', the registerUser method will be called
router.post('/register', userController.registerUser);

// Define a POST route for user login
// When a request is made to '/login', the loginUser method will be called
router.post('/login', userController.loginUser);

// Define a PUT route for updating user profiles
// The ':username' is a route parameter used to specify the user to update
// When a request is made to '/:username', the updateUserProfile method will be called
router.put('/:username', userController.updateUserProfile);

// Export the router to be used in other parts of the application
module.exports = router;
