const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB Connection
const mongoURI = config.get('mongoURI');
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start Server
const port = config.get('port') || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));