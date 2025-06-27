const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  numberPlate: {
    type: String,
    required: [true, 'Number plate is required.'],
    unique: true,
    uppercase: true,
    trim: true,
    // Example validation: KDA 123X. Adjust regex as per actual Kenyan format.
    // match: [/^[A-Z]{3}\s\d{3}[A-Z]$/, 'Please provide a valid number plate in format AAA 123A']
  },
  vehicleType: {
    type: String,
    required: [true, 'Vehicle type is required.'],
    enum: {
      values: ['Bus', 'Minibus', 'Van', 'Shuttle', 'Coach'],
      message: '{VALUE} is not a supported vehicle type.'
    }
  },
  logbookNumber: {
    type: String,
    required: [true, 'Logbook number is required.'],
    unique: true,
    trim: true,
  },
  routes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    // required: true // A vehicle might be registered before being assigned a route
  }],
  passengerCapacity: {
    type: Number,
    required: [true, 'Passenger capacity is required.'],
    min: [1, 'Passenger capacity must be at least 1.'],
  },
  nickname: { // Fleet number
    type: String,
    trim: true,
    sparse: true, // Can be unique if present, but not required
    // unique: true, // Uncomment if fleet numbers must be unique
  },
  inspectionDetails: {
    reportNumber: { type: String, trim: true },
    inspectionDate: { type: Date },
    expiryDate: { type: Date },
    nextInspectionDate: { type: Date }, // NTSA
    // Consider adding a history of inspections if needed
  },
  insuranceDetails: {
    policyNumber: { type: String, trim: true },
    provider: { type: String, trim: true },
    startDate: { type: Date },
    expiryDate: { type: Date }, // NTSA
    // Consider adding a history of insurance if needed
  },
  owner: { // SACCO member who owns the vehicle
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Vehicle owner (SACCO member) is required.'],
    // Validate that the user has the 'sacco_member' role if strict linking is needed here
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User must have 'driver' role
    optional: true,
  },
  assignedConductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User must have 'conductor' role
    optional: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Under Maintenance', 'Awaiting Inspection', 'Awaiting Insurance', 'Scrapped'],
    default: 'Inactive',
  },
  ntsaRequirements: {
    roadServiceLicenseNumber: { type: String, trim: true },
    roadServiceLicenseValidThru: { type: Date },
    speedGovernorCompliant: { type: Boolean, default: true },
    speedGovernorSerialNumber: { type: String, trim: true, optional: true },
    speedGovernorLastCheck: { type: Date, optional: true },
    // Other NTSA specific fields can be added here
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Indexing common query fields
vehicleSchema.index({ numberPlate: 1 });
vehicleSchema.index({ nickname: 1 });
vehicleSchema.index({ owner: 1 });
vehicleSchema.index({ status: 1 });

// Pre-save hook to ensure numberPlate is uppercase
vehicleSchema.pre('save', function(next) {
  if (this.numberPlate) {
    this.numberPlate = this.numberPlate.toUpperCase();
  }
  next();
});

// TODO: Add pre-save/validate hooks to ensure assignedDriver/Conductor have correct roles if assigned.
// This would require querying the User model, so might be better handled at controller/service level.

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
