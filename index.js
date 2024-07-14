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

<<<<<<< HEAD
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
=======

app.get('/add-parking-lot', (req, res) => {
    res.sendFile(__dirname + '/views/parking-lot.html');
});

app.get('/add-parking-lot', (req, res) => {
    res.sendFile(__dirname + '/views/parking-lots.html');
});

app.get('/entry', (req, res) => {
    res.sendFile(__dirname + '/views/vehicle-entry.html');
});

app.get('/exit', (req, res) => {
    res.sendFile(__dirname + '/views/vehicle-exit.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
>>>>>>> 98cacc25615570e456d045374b77ba3c59f88fe7
