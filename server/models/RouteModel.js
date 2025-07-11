const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, trim: true }
}, { _id: false });

const waypointSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, trim: true },
  order: { type: Number, required: true } // To maintain sequence of waypoints
}, { _id: false });

const routeSchema = new mongoose.Schema({
  // --- Existing Fields (Kept as requested) ---
  routeName: { // e.g., "CBD - Kasarani" or a descriptive name for the new system
    type: String,
    required: [true, 'Route name is required.'],
    unique: true,
    trim: true,
    // uppercase: true, // Retained via pre-save hook
  },
  routeNumber: { // e.g., "101A", "45G" - Kept from original
    type: String,
    // optional: true, // Mongoose fields are optional by default unless `required` is true
    trim: true,
    // uppercase: true, // Retained via pre-save hook
    sparse: true,
    // unique: true, // Uncomment if route numbers must be unique when provided
  },
  tlbRouteInfo: { // Transport Licensing Board official route designation or details - Kept
    type: String,
    trim: true,
  },
  standardFare: { // Default or average fare for the route - Kept
    type: Number,
    min: [0, 'Standard fare cannot be negative.'],
  },
  typicalDailyIncomeExpectation: { // For Route Management & Performance - Kept
    type: Number,
    min: [0, 'Income expectation cannot be negative.'],
  },
  ntsaComplianceDetails: { // Any specific NTSA notes or requirements for this route - Kept
    type: String,
    trim: true,
  },

  // --- New Fields from Requirements ---
  origin: {
    type: locationSchema,
    required: [true, 'Origin point is required.']
  },
  destination: {
    type: locationSchema,
    required: [true, 'Destination point is required.']
  },
  waypoints: [waypointSchema], // An ordered list of intermediate points
  estimatedDistance: { // in kilometers
    type: Number,
    required: [true, 'Estimated distance is required.'],
    min: [0, 'Estimated distance cannot be negative.']
  },
  estimatedDuration: { // in minutes
    type: Number,
    required: [true, 'Estimated duration is required.'],
    min: [0, 'Estimated duration cannot be negative.']
  },
  routeType: {
    type: String,
    required: [true, 'Route type is required.'],
    enum: ['Delivery', 'Pickup', 'Maintenance', 'Planned', 'Historical', 'Optimized']
  },
  assignedVehicle: { // Can be an ID string or ObjectId referencing a Vehicle model
    type: mongoose.Schema.Types.Mixed, // Using Mixed for now, can be ObjectId if Vehicle model is integrated
    // ref: 'Vehicle' // Add this when Vehicle model is formally defined
  },
  assignedDriver: { // Can be an ID string or ObjectId referencing a Driver model
    type: mongoose.Schema.Types.Mixed, // Using Mixed for now, can be ObjectId if Driver model is integrated
    // ref: 'Driver' // Add this when Driver model is formally defined
  },
  status: { // Updated enum values
    type: String,
    enum: ['Planned', 'Active', 'Completed', 'Canceled', 'Archived'],
    default: 'Planned',
    required: true
  },

  // --- Auditing Fields (Kept from original) ---
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes a User model exists
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes a User model exists
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// --- Indexes (Retained and new ones can be added as needed) ---
routeSchema.index({ routeName: 1 });
routeSchema.index({ routeNumber: 1 }, { sparse: true }); // Ensure sparse is effective for optional unique fields
routeSchema.index({ status: 1 });
routeSchema.index({ routeType: 1 });
routeSchema.index({ "origin.address": "text", "destination.address": "text" }); // For text search on addresses if needed

// --- Pre-save hook (Retained from original) ---
// Ensures routeName and routeNumber are uppercase before saving
routeSchema.pre('save', function(next) {
  if (this.isModified('routeName') && this.routeName) {
    this.routeName = this.routeName.toUpperCase();
  }
  if (this.isModified('routeNumber') && this.routeNumber) {
    this.routeNumber = this.routeNumber.toUpperCase();
  }
  next();
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
