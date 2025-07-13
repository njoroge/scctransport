const express = require('express');
const router = express.Router();
const gpsDataController = require('../controllers/gpsDataController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you want to protect this route

// @route   POST api/gps-data
// @desc    Submit GPS data for a vehicle
// @access  Private (e.g., only authenticated devices/services can submit)
router.post('/', protect, gpsDataController.submitGPSData);

router.get('/latest', protect, gpsDataController.getLatestGpsData);
router.get('/:vehicleId', protect, gpsDataController.getGpsDataForVehicle);

module.exports = router;
