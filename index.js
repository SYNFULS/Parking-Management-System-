const express = require('express');
const app = express();
const port = 3000;
const parkingRoutes = require('./routes/parking.routes');

app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

app.use('/api', parkingRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/add-parking-lot', (req, res) => {
    res.sendFile(__dirname + '/views/add_parking_lot.html');
});

app.get('/entry', (req, res) => {
    res.sendFile(__dirname + '/views/entry.html');
});

app.get('/exit', (req, res) => {
    res.sendFile(__dirname + '/views/exit.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
