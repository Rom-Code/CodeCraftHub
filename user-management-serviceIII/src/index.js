// Import the Express framework
const express = require('express');
// Import the database connection function
const connectDB = require('./config/database');
// Import user routes for handling user-related endpoints
const userRoutes = require('./routes/userRoutes');

// Create an instance of an Express application
const app = express();

// Connect to MongoDB using the connectDB function
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes for user-related operations
// All user routes will be prefixed with '/users'
app.use('/users', userRoutes);

// Define the port on which the server will listen
const port = 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`); // Log a message indicating the server has started
});
