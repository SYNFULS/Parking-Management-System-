const ParkingModel = require('../models/parking.model');

// Controller functions for handling requests

const ParkingController = {
    getAllParkingLots: (req, res) => {
        ParkingModel.getAllParkingLots((err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    getParkingLotById: (req, res) => {
        const { id } = req.params;
        ParkingModel.getParkingLotById(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    createParkingLot: (req, res) => {
        const data = req.body;
        ParkingModel.createParkingLot(data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.status(201).json({ message: 'Parking lot created', id: results.insertId });
        });
    },

    updateParkingLot: (req, res) => {
        const { id } = req.params;
        const data = req.body;
        ParkingModel.updateParkingLot(id, data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Parking lot updated' });
        });
    },

    deleteParkingLot: (req, res) => {
        const { id } = req.params;
        ParkingModel.deleteParkingLot(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Parking lot deleted' });
        });
    }
};

module.exports = ParkingController;
