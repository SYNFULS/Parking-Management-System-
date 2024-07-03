const express = require('express');
const router = express.Router();
const ParkingController = require('../controllers/parking.controller');

// Define routes

router.get('/parking-lots', ParkingController.getAllParkingLots);
router.get('/parking-lots/:id', ParkingController.getParkingLotById);
router.post('/parking-lots', ParkingController.createParkingLot);
router.put('/parking-lots/:id', ParkingController.updateParkingLot);
router.delete('/parking-lots/:id', ParkingController.deleteParkingLot);

module.exports = router;
