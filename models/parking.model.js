const db = require('../config/db.config');

// Model functions for CRUD operations

const ParkingModel = {
    getAllParkingLots: (callback) => {
        db.query('SELECT * FROM Parking_lot', callback);
    },

    getParkingLotById: (id, callback) => {
        db.query('SELECT * FROM Parking_lot WHERE lot_id = ?', [id], callback);
    },

    createParkingLot: (data, callback) => {
        const { lot_name, location, total_space, avl_space, hourly_rate, contact_num } = data;
        db.query(
            'INSERT INTO Parking_lot (lot_name, location, total_space, avl_space, hourly_rate, contact_num) VALUES (?, ?, ?, ?, ?, ?)',
            [lot_name, location, total_space, avl_space, hourly_rate, contact_num],
            callback
        );
    },

    updateParkingLot: (id, data, callback) => {
        const { lot_name, location, total_space, avl_space, hourly_rate, contact_num } = data;
        db.query(
            'UPDATE Parking_lot SET lot_name = ?, location = ?, total_space = ?, avl_space = ?, hourly_rate = ?, contact_num = ? WHERE lot_id = ?',
            [lot_name, location, total_space, avl_space, hourly_rate, contact_num, id],
            callback
        );
    },

    deleteParkingLot: (id, callback) => {
        db.query('DELETE FROM Parking_lot WHERE lot_id = ?', [id], callback);
    }
};

module.exports = ParkingModel;
