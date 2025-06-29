const mongoose = require('mongoose');

const deductionSchema = new mongoose.Schema({
  type: { // e.g., 'NSSF', 'NHIF', 'Loan Repayment', 'Welfare Deduction', 'Fine', 'Other'
    type: String,
    required: [true, 'Deduction type is required.'],
    trim: true,
  },
  description: { // Optional further details
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Deduction amount is required.'],
    min: [0, 'Deduction amount cannot be negative.']
  }
}, { _id: false }); // No separate _id for sub-documents unless needed

const payrollRecordSchema = new mongoose.Schema({
  crewMember: { // User ID of the crew member (driver, conductor, mechanic, route_marshal)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Crew member (User ID) is required.'],
  },
  payPeriodStartDate: {
    type: Date,
    required: [true, 'Pay period start date is required.'],
  },
  payPeriodEndDate: {
    type: Date,
    required: [true, 'Pay period end date is required.'],
  },
  grossPay: { // Calculated or entered before deductions
    type: Number,
    required: [true, 'Gross pay is required.'],
    min: [0, 'Gross pay cannot be negative.']
  },
  deductions: [deductionSchema], // Array of deduction sub-documents
  deductionsTotal: { // Sum of all deduction amounts
    type: Number,
    default: 0,
    min: [0, 'Total deductions cannot be negative.']
  },
  netPay: { // Gross Pay - Deductions Total
    type: Number,
    required: [true, 'Net pay is required.'],
    // min: [0, 'Net pay cannot be negative.'] // Net pay can be negative if deductions exceed gross
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['Bank Transfer', 'Cash', 'Mobile Money', 'Cheque', 'Other'],
    default: 'Bank Transfer',
  },
  referenceNumber: { // For payment transaction reference
    type: String,
    optional: true,
    trim: true,
    sparse: true,
  },
  status: { // Status of this payroll record
    type: String,
    enum: ['Pending', 'Processing', 'Paid', 'Failed', 'Cancelled', 'On Hold'],
    default: 'Pending',
  },
  notes: { // Any specific notes about this payroll entry
    type: String,
    optional: true,
    trim: true,
  },
  generatedBy: { // User ID of the staff who generated/recorded this payroll
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Generator (User ID) is required.'],
  },
  basisOfPayment: { // How the gross pay was determined
    type: String,
    enum: ['Fixed Rate', 'Commission', 'Hourly', 'Daily Rate', 'Trip Rate', 'Mixed', 'Other'],
    default: 'Fixed Rate',
  },
  // Future fields: hoursWorked, tripsCompleted, commissionRate, taxDetails, etc.
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Indexing
payrollRecordSchema.index({ crewMember: 1, payPeriodEndDate: -1 });
payrollRecordSchema.index({ status: 1 });
payrollRecordSchema.index({ paymentDate: -1 });

// Pre-save hook to calculate deductionsTotal and netPay
payrollRecordSchema.pre('save', function(next) {
  if (this.isModified('deductions') || this.isModified('grossPay')) {
    this.deductionsTotal = this.deductions.reduce((acc, curr) => acc + curr.amount, 0);
    this.netPay = this.grossPay - this.deductionsTotal;
  }
  next();
});

// Pre-validation or pre-save hook to ensure the 'crewMember' user has an appropriate role
payrollRecordSchema.pre('save', async function(next) {
  if (this.isModified('crewMember') || this.isNew) {
    const user = await mongoose.model('User').findById(this.crewMember);
    if (!user) {
      return next(new Error(`User (Crew Member) with ID ${this.crewMember} not found.`));
    }
    const validCrewRoles = ['driver', 'conductor', 'route_marshal', 'mechanic', 'admin']; // Admin can be for testing/override
    if (!validCrewRoles.includes(user.role)) {
      return next(new Error(`User ${user.name} (Role: ${user.role}) is not a valid crew member type for payroll.`));
    }
  }
  next();
});


const PayrollRecord = mongoose.model('PayrollRecord', payrollRecordSchema);

module.exports = PayrollRecord;
