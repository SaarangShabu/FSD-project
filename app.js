// Import required modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const indexRouter = require('./routes/index');

// Create an instance of the Express application
const app = express();

// Define the port for the server
const PORT = process.env.PORT || 3000;

// Set up middleware for logging HTTP requests
app.use(morgan('dev'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the router for the home page
app.use('/', indexRouter);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error.html'));
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong! Please try again later.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
