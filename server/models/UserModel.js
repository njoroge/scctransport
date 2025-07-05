const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // We'll need this for password hashing

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    // Basic email validation, more robust validation can be added
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Do not return password by default when querying users
  },
  role: {
    type: String,
    enum: ['sacco_member', 'driver', 'conductor', 'admin', 'route_marshal', 'mechanic', 'clerk'],
    default: 'sacco_member', // Default role, can be changed upon specific registration flows
  },
  memberId: { // Specific to SACCO members (owners)
    type: String,
    unique: true,
    sparse: true, // Allows multiple documents to have null for this field, but unique if present
    trim: true,
    // This can be auto-generated or manually entered based on SACCO rules
  },
  phoneNumber: {
    type: String,
    trim: true,
    // Add validation if specific format is required
  },
  isActive: { // To deactivate users instead of deleting
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Future fields: profilePictureUrl, etc.

  idVerification: {
    status: {
      type: String,
      enum: ['not_verified', 'pending', 'verified', 'failed', 'needs_review'],
      default: 'not_verified',
    },
    nationalIdNumber: { // Consider encryption for this field
      type: String,
      trim: true,
      // select: false, // Potentially hide from default queries unless explicitly asked
    },
    fullNameOnId: { // As it appears on the ID document
      type: String,
      trim: true,
    },
    dobOnId: { // Date of Birth on the ID document
      type: Date,
    },
    lastAttemptAt: { // Timestamp of the last verification attempt
      type: Date,
    },
    verifiedAt: { // Timestamp of successful verification
      type: Date,
    },
    providerReference: { // ID or reference from the verification service provider
      type: String,
      trim: true,
    },
    remarks: { // For storing any notes, e.g., reason for failure or manual review notes
      type: String,
      trim: true,
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare candidate password with hashed password in DB
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
