const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/parking.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes defined in routes.js
app.use('/api', routes); // Prefix all API routes with '/api'

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'views')));

// Handle root route ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'parking-lot.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});