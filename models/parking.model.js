const db = require('../config/db.config');

const ParkingModel = {
    getAllParkingLots: (callback) => {
        db.query('SELECT * FROM ParkingLots', callback);
    },

    getParkingLotById: (id, callback) => {
        db.query('SELECT * FROM ParkingLots WHERE parking_lot_id = ?', [id], callback);
    },




    getAllParkingSpaces: (callback) => {
        db.query('SELECT * FROM ParkingSpaces', callback);
    },

    getParkingSpaceById: (id, callback) => {
        db.query('SELECT * FROM ParkingSpaces WHERE space_id = ?', [id], callback);
    },



    updateParkingSpace: (data, callback) => {

        const { space_id, is_occupied } = data;
  
        db.query(
            'UPDATE ParkingSpaces SET is_occupied = ? WHERE space_id = ?',
            [ is_occupied,space_id ],

            callback
        );
    },

    deleteParkingSpace: (id, callback) => {
        db.query('DELETE FROM ParkingSpaces WHERE space_id = ?', [id], callback);
    },

    getAllVehicles: (callback) => {
        db.query('SELECT * FROM Vehicles', callback);
    },

    getVehicleById: (id, callback) => {
        db.query('SELECT * FROM Vehicles WHERE vehicle_id = ?', [id], callback);
    },

    createVehicle: (data, callback) => {
        const { license_plate, owner_name, owner_contact, vehicle_type, hourly_rate,space_id } = data;
        db.query(
            'INSERT INTO Vehicles (license_plate, owner_name, owner_contact, vehicle_type, hourly_rate) VALUES (?, ?, ?, ?, ?)',
            [license_plate, owner_name, owner_contact, vehicle_type, hourly_rate],
            callback
        );
    },

    updateVehicle: (id, data, callback) => {
        const { license_plate, vehicle_type } = data;
        db.query(
            'UPDATE Vehicles SET license_plate = ?, vehicle_type = ? WHERE vehicle_id = ?',
            [license_plate, vehicle_type, id],
            callback
        );
    },

    deleteVehicle: (id, callback) => {
        db.query('DELETE FROM Vehicles WHERE vehicle_id = ?', [id], callback);
    },

    getAllLogs: (callback) => {
        db.query('SELECT * FROM EntryExitLogs', callback);
    },

    getLogById: (id, callback) => {
        db.query('SELECT * FROM EntryExitLogs WHERE log_id = ?', [id], callback);
    },

    createLog: (data, callback) => {
        const { license_plate, space_id, entry_time} = data;
        db.query(
            'INSERT INTO EntryExitLogs (license_plate,space_id, entry_time) VALUES (?, ?, ?)',
            [license_plate, space_id, entry_time],
            callback
        );
    },

    updateLog: (id, data, callback) => {
        const { vehicle_id, space_id, entry_time, exit_time } = data;
        db.query(
            'UPDATE EntryExitLogs SET vehicle_id = ?, space_id = ?, entry_time = ?, exit_time = ? WHERE log_id = ?',
            [vehicle_id, space_id, entry_time, exit_time, id],
            callback
        );
    },

    deleteLog: (id, callback) => {
        db.query('DELETE FROM EntryExitLogs WHERE log_id = ?', [id], (err, results) => {
            if (err) return callback(err);
            // Also delete the vehicle entry when the log is deleted
            db.query('DELETE FROM Vehicles WHERE vehicle_id = (SELECT vehicle_id FROM EntryExitLogs WHERE log_id = ?)', [id], callback);
        });
    },

    getAvailableSpaces: (parking_lot_id, callback) => {
        db.query('SELECT * FROM ParkingSpaces WHERE parking_lot_id = ? AND is_occupied = 0', [parking_lot_id], callback);
    }
};

module.exports = ParkingModel;
