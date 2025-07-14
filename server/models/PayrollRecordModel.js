const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['basic', 'commission', 'overtime', 'bonus', 'allowance']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: String
}, { _id: false });

const statutoryDeductionSchema = new mongoose.Schema({
  paye: { type: Number, default: 0 },
  nssf: { type: Number, default: 0 },
  shif: { type: Number, default: 0 },
  affordableHousingLevy: { type: Number, default: 0 },
  helb: { type: Number, default: 0 }
}, { _id: false });

const saccoDeductionSchema = new mongoose.Schema({
  shares: { type: Number, default: 0 },
  loanRepayment: { type: Number, default: 0 },
  memberDeposits: { type: Number, default: 0 }
}, { _id: false });

const otherDeductionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: String
}, { _id: false });

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
  earnings: [earningSchema],
  grossPay: {
    type: Number,
    required: true,
    min: 0
  },
  statutoryDeductions: statutoryDeductionSchema,
  saccoDeductions: saccoDeductionSchema,
  otherDeductions: [otherDeductionSchema],
  totalDeductions: {
    type: Number,
    required: true,
    min: 0
  },
  netPay: {
    type: Number,
    required: true
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

// Pre-save hook to calculate totals
payrollRecordSchema.pre('save', function(next) {
  if (this.isModified('earnings') || this.isModified('statutoryDeductions') || this.isModified('saccoDeductions') || this.isModified('otherDeductions')) {
    this.grossPay = this.earnings.reduce((acc, curr) => acc + curr.amount, 0);

    const statutoryTotal = Object.values(this.statutoryDeductions.toObject() || {}).reduce((acc, curr) => acc + curr, 0);
    const saccoTotal = Object.values(this.saccoDeductions.toObject() || {}).reduce((acc, curr) => acc + curr, 0);
    const otherTotal = this.otherDeductions.reduce((acc, curr) => acc + curr.amount, 0);

    this.totalDeductions = statutoryTotal + saccoTotal + otherTotal;
    this.netPay = this.grossPay - this.totalDeductions;
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
