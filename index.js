const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db.config');

// Middleware
app.use(express.json());

// Simple route to get all parking lots
app.get('/api/parkingLots', (req, res) => {
    db.query('SELECT * FROM ParkingLots', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Routes
const parkingRoutes = require('./routes/parking.routes');
app.use('/api', parkingRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
