const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: { // e.g., "CBD - Kasarani"
    type: String,
    required: [true, 'Route name is required.'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  routeNumber: { // e.g., "101A", "45G"
    type: String,
    optional: true,
    trim: true,
    uppercase: true,
    sparse: true, // Can be unique if present
    // unique: true, // Uncomment if route numbers must be unique when provided
  },
  tlbRouteInfo: { // Transport Licensing Board official route designation or details
    type: String,
    trim: true,
    optional: true,
  },
  standardFare: { // Default or average fare for the route
    type: Number,
    optional: true,
    min: [0, 'Standard fare cannot be negative.'],
  },
  typicalDailyIncomeExpectation: { // For Route Management & Performance
    type: Number,
    optional: true,
    min: [0, 'Income expectation cannot be negative.'],
  },
  ntsaComplianceDetails: { // Any specific NTSA notes or requirements for this route
    type: String,
    optional: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Proposed', 'Under Review'],
    default: 'Active',
  },
  // Waypoints or stages could be an array of strings or more complex objects if needed
  // stages: [{ name: String, order: Number, fareToStage: Number }]
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
  timestamps: true,
});

routeSchema.index({ routeName: 1 });
routeSchema.index({ routeNumber: 1 });
routeSchema.index({ status: 1 });

// Pre-save hook to ensure routeName and routeNumber are uppercase
routeSchema.pre('save', function(next) {
  if (this.routeName) {
    this.routeName = this.routeName.toUpperCase();
  }
  if (this.routeNumber) {
    this.routeNumber = this.routeNumber.toUpperCase();
  }
  next();
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
