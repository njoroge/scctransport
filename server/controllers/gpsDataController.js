const GPSData = require('../models/GPSDataModel');
const Vehicle = require('../models/VehicleModel'); // To validate vehicleId if needed

// @desc    Submit GPS data
// @route   POST /api/gps-data
// @access  Private
exports.submitGPSData = async (req, res) => {
  const { vehicleId, latitude, longitude, speed, heading, timestamp } = req.body;

  try {
    // Basic validation (more comprehensive validation is in the model)
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Latitude and Longitude are required.' });
    }

    // Optional: Check if the vehicleId exists in the Vehicle collection
    // This adds an extra DB query but ensures data integrity.
    // Consider if this check is critical for your performance requirements.
    if (vehicleId) {
        const vehicleExists = await Vehicle.findById(vehicleId);
        if (!vehicleExists) {
            return res.status(404).json({ message: 'Vehicle not found.' });
        }
    } else {
        return res.status(400).json({ message: 'vehicleId is required.' });
    }


    const newGPSData = new GPSData({
      vehicleId,
      latitude,
      longitude,
      speed,
      heading,
      timestamp: timestamp ? new Date(timestamp) : Date.now(), // Use provided timestamp or default to now
    });

    await newGPSData.save();
    res.status(201).json({
      message: 'GPS data submitted successfully.',
      data: newGPSData,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Extract validation messages
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    console.error('Error submitting GPS data:', error);
    res.status(500).json({ message: 'Server error while submitting GPS data.' });
  }
};

// Future controller functions for getting locations will be added here
// exports.getLatestLocation = async (req, res) => { ... };
// exports.getActiveVehiclesLocations = async (req, res) => { ... };
