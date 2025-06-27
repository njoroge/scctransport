const mongoose = require('mongoose');

const crewProfileSchema = new mongoose.Schema({
  user: { // Link to the User model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required for a crew profile.'],
    unique: true, // Each user can only have one crew profile
  },
  psvLicenseNumber: {
    type: String,
    required: [true, 'PSV license number is required.'],
    unique: true,
    trim: true,
  },
  psvLicenseExpiry: {
    type: Date,
    required: [true, 'PSV license expiry date is required.'], // NTSA
  },
  dateOfBirth: {
    type: Date,
    // required: [true, 'Date of birth is required.'] // Make optional if not strictly needed initially
  },
  nationalId: {
    type: String,
    required: [true, 'National ID number is required.'],
    unique: true,
    trim: true,
  },
  phoneNumber: { // Can be different from User's primary phone or for specific crew contact
    type: String,
    required: [true, 'Crew phone number is required.'],
    trim: true,
    // Consider adding a validation regex for Kenyan phone numbers
  },
  address: {
    type: String,
    trim: true,
  },
  nextOfKinName: {
    type: String,
    trim: true,
  },
  nextOfKinPhone: {
    type: String,
    trim: true,
  },
  employmentDate: {
    type: Date,
    default: Date.now,
  },
  photoUrl: { // For ID cards, system profile, etc.
    type: String,
    optional: true,
    trim: true,
    // match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, 'Please provide a valid image URL'] // Basic URL validation
  },
  remarks: { // Any additional notes about the crew member
    type: String,
    optional: true,
    trim: true,
  },
  isActive: { // To mark if the crew member is currently active with the SACCO
    type: Boolean,
    default: true,
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
  timestamps: true,
});

// Ensure the linked user has an appropriate role (driver or conductor)
// This validation is complex for schema level, better handled in controller/service layer before saving.
// Example:
// crewProfileSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('user')) {
//     const user = await mongoose.model('User').findById(this.user);
//     if (!user || !['driver', 'conductor', 'route_marshal', 'mechanic'].includes(user.role)) {
//       return next(new Error(`User with ID ${this.user} must have a crew-related role (driver, conductor, etc.).`));
//     }
//   }
//   next();
// });

crewProfileSchema.index({ user: 1 });
crewProfileSchema.index({ psvLicenseNumber: 1 });
crewProfileSchema.index({ nationalId: 1 });

const CrewProfile = mongoose.model('CrewProfile', crewProfileSchema);

module.exports = CrewProfile;
