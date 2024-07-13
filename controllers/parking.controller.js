const ParkingModel = require('../models/parking.model');

// Controller functions for handling requests

const ParkingController = {
    // ParkingLots
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
    },

    // ParkingSpaces
    getAllParkingSpaces: (req, res) => {
        ParkingModel.getAllParkingSpaces((err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    getParkingSpaceById: (req, res) => {
        const { id } = req.params;
        ParkingModel.getParkingSpaceById(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    createParkingSpace: (req, res) => {
        const data = req.body;
        ParkingModel.createParkingSpace(data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.status(201).json({ message: 'Parking space created', id: results.insertId });
        });
    },

    updateParkingSpace: (req, res) => {
        const { id } = req.params;
        const data = req.body;
        ParkingModel.updateParkingSpace(id, data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Parking space updated' });
        });
    },

    deleteParkingSpace: (req, res) => {
        const { id } = req.params;
        ParkingModel.deleteParkingSpace(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Parking space deleted' });
        });
    },

    // Vehicles
    getAllVehicles: (req, res) => {
        ParkingModel.getAllVehicles((err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    getVehicleById: (req, res) => {
        const { id } = req.params;
        ParkingModel.getVehicleById(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    createVehicle: (req, res) => {
        const data = req.body;
        ParkingModel.createVehicle(data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.status(201).json({ message: 'Vehicle created', id: results.insertId });
        });
    },

    updateVehicle: (req, res) => {
        const { id } = req.params;
        const data = req.body;
        ParkingModel.updateVehicle(id, data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Vehicle updated' });
        });
    },

    deleteVehicle: (req, res) => {
        const { id } = req.params;
        ParkingModel.deleteVehicle(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Vehicle deleted' });
        });
    },

    // EntryExitLogs
    getAllLogs: (req, res) => {
        ParkingModel.getAllLogs((err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    getLogById: (req, res) => {
        const { id } = req.params;
        ParkingModel.getLogById(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    },

    createLog: (req, res) => {
        const data = req.body;
        ParkingModel.createLog(data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.status(201).json({ message: 'Log created', id: results.insertId });
        });
    },

    updateLog: (req, res) => {
        const { id } = req.params;
        const data = req.body;
        ParkingModel.updateLog(id, data, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Log updated' });
        });
    },

    
    deleteLog: (req, res) => {
        const { id } = req.params;
        ParkingModel.deleteLog(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Log deleted' });
        });
    },

    getAvailableSpaces: (req, res) => {
        const { parking_lot_id } = req.params;
        ParkingModel.getAvailableSpaces(parking_lot_id, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(results);
        });
    }
};

module.exports = ParkingController;
