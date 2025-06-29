const mongoose = require('mongoose');

const welfareContributionSchema = new mongoose.Schema({
  member: { // SACCO Member making the contribution
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Member (User ID) is required for the contribution.'],
  },
  contributionDate: {
    type: Date,
    default: Date.now,
    required: [true, 'Contribution date is required.'],
  },
  amount: {
    type: Number,
    required: [true, 'Contribution amount is required.'],
    min: [0, 'Contribution amount cannot be negative.'],
  },
  contributionType: {
    type: String,
    enum: ['Standard Monthly', 'Benevolent Fund', 'Emergency Support', 'Shares Purchase', 'Other'],
    default: 'Standard Monthly',
    required: [true, 'Contribution type is required.']
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Bank Transfer', 'Mobile Money', 'Payroll Deduction', 'Other'],
    default: 'Cash',
    required: [true, 'Payment method is required.']
  },
  referenceNumber: { // For bank slips, M-Pesa transaction IDs, etc.
    type: String,
    optional: true,
    trim: true,
    sparse: true, // Allows nulls but unique if present (if you want unique references)
    // unique: true, // Uncomment if reference numbers must be unique when provided
  },
  recordedBy: { // User ID of the staff who recorded this transaction
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recorder (User ID) is required.'],
  },
  remarks: {
    type: String,
    optional: true,
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Indexing common query fields
welfareContributionSchema.index({ member: 1, contributionDate: -1 });
welfareContributionSchema.index({ contributionType: 1 });
welfareContributionSchema.index({ paymentMethod: 1 });
welfareContributionSchema.index({ referenceNumber: 1 }, { unique: true, sparse: true }); // Example if unique ref needed

// Pre-validation or pre-save hook to ensure the 'member' user has 'sacco_member' role
welfareContributionSchema.pre('save', async function(next) {
  if (this.isModified('member') || this.isNew) {
    const user = await mongoose.model('User').findById(this.member);
    if (!user) {
      return next(new Error(`User with ID ${this.member} not found.`));
    }
    // Allowing admin to also make contributions on behalf of Sacco if needed, or for system entries
    // Or strictly enforce 'sacco_member'
    if (user.role !== 'sacco_member') {
      // Consider if other roles (like 'admin' acting for Sacco) can be 'members' in this context
      // For now, strict to sacco_member
      return next(new Error(`User ${user.name} is not a SACCO member. Contributions only for members.`));
    }
  }
  next();
});


const WelfareContribution = mongoose.model('WelfareContribution', welfareContributionSchema);

module.exports = WelfareContribution;
