const db = require('../config/db.config');

// Model functions for CRUD operations

const ParkingModel = {
    getAllParkingLots: (callback) => {
        db.query('SELECT * FROM ParkingLots', callback);
    },

    getParkingLotById: (id, callback) => {
        db.query('SELECT * FROM ParkingLots WHERE parking_lot_id = ?', [id], callback);
    },

    createParkingLot: (data, callback) => {
        const { lot_name, location, total_spaces, available_spaces, contact_number } = data;
        db.query(
            'INSERT INTO ParkingLots (lot_name, location, total_spaces, available_spaces, contact_number) VALUES (?, ?, ?, ?, ?)',
            [lot_name, location, total_spaces, available_spaces, contact_number],
            callback
        );
    },

    updateParkingLot: (id, data, callback) => {
        const { lot_name, location, total_spaces, available_spaces, contact_number } = data;
        db.query(
            'UPDATE ParkingLots SET lot_name = ?, location = ?, total_spaces = ?, available_spaces = ?, contact_number = ? WHERE parking_lot_id = ?',
            [lot_name, location, total_spaces, available_spaces, contact_number, id],
            callback
        );
    },

    deleteParkingLot: (id, callback) => {
        db.query('DELETE FROM ParkingLots WHERE parking_lot_id = ?', [id], callback);
    }
};

module.exports = ParkingModel;
