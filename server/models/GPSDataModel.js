const mongoose = require('mongoose');

const gpsDataSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle', // Assuming you have a Vehicle model
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required.'],
    min: [-90, 'Latitude must be between -90 and 90.'],
    max: [90, 'Latitude must be between -90 and 90.'],
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required.'],
    min: [-180, 'Longitude must be between -180 and 180.'],
    max: [180, 'Longitude must be between -180 and 180.'],
  },
  speed: { // Speed in km/h or mph, define unit consistency
    type: Number,
    min: [0, 'Speed cannot be negative.'],
  },
  heading: { // Heading in degrees (0-360)
    type: Number,
    min: [0, 'Heading must be between 0 and 360.'],
    max: [360, 'Heading must be between 0 and 360.'],
  },
  // Optional: accuracy, altitude, etc.
});

// Compound index for frequently queried fields
gpsDataSchema.index({ vehicleId: 1, timestamp: -1 }); // To get latest location for a vehicle quickly

const GPSData = mongoose.model('GPSData', gpsDataSchema);

module.exports = GPSData;
