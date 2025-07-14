const PayrollRecord = require('../models/PayrollRecordModel');
const User = require('../models/UserModel'); // For validating crew member
const asyncHandler = require('express-async-handler');
const { calculateStatutoryDeductions } = require('../services/payrollCalculationService');

/**
 * @desc    Create a new payroll record
 * @route   POST /api/payroll/records
 * @access  Private (Admin/Payroll Staff)
 */
const createPayrollRecord = asyncHandler(async (req, res) => {
  const {
    crewMember, // User ID
    payPeriodStartDate,
    payPeriodEndDate,
    earnings, // [{ type, amount, description }]
    saccoDeductions, // { shares, loanRepayment, memberDeposits }
    otherDeductions, // [{ type, amount, description }]
    paymentMethod,
    referenceNumber,
    status,
    notes,
    basisOfPayment,
  } = req.body;

  // Basic validation
  if (!crewMember || !payPeriodStartDate || !payPeriodEndDate || !earnings) {
    res.status(400);
    throw new Error('Missing required fields: crewMember, payPeriodStartDate, payPeriodEndDate, earnings.');
  }

  // Crew member validation
  const crewUser = await User.findById(crewMember);
  if (!crewUser) {
      res.status(404);
      throw new Error(`Crew member with User ID ${crewMember} not found.`);
  }
  const validCrewRoles = ['driver', 'conductor', 'route_marshal', 'mechanic', 'admin'];
  if (!validCrewRoles.includes(crewUser.role)) {
      res.status(400);
      throw new Error(`User ${crewUser.name} (Role: ${crewUser.role}) is not a valid crew member type for payroll.`);
  }

  const grossPay = earnings.reduce((acc, curr) => acc + curr.amount, 0);

  const statutoryDeductions = calculateStatutoryDeductions(grossPay);

  const payrollRecord = new PayrollRecord({
    crewMember,
    payPeriodStartDate,
    payPeriodEndDate,
    earnings,
    grossPay,
    statutoryDeductions,
    saccoDeductions,
    otherDeductions,
    paymentMethod,
    referenceNumber,
    status,
    notes,
    basisOfPayment,
    generatedBy: req.user._id,
  });

  const createdRecord = await payrollRecord.save();
  const populatedRecord = await PayrollRecord.findById(createdRecord._id)
    .populate('crewMember', 'name email role memberId')
    .populate('generatedBy', 'name email');
  res.status(201).json(populatedRecord);
});

/**
 * @desc    Get all payroll records
 * @route   GET /api/payroll/records
 * @access  Private (Admin/Payroll Staff)
 */
const getAllPayrollRecords = asyncHandler(async (req, res) => {
  const { crewMemberId, status, startDate, endDate } = req.query;
  let query = {};

  if (crewMemberId) query.crewMember = crewMemberId;
  if (status) query.status = status;
  if (startDate || endDate) {
    query.payPeriodEndDate = {}; // Query based on pay period end date, or make flexible
    if (startDate) query.payPeriodEndDate.$gte = new Date(startDate); // Or use payPeriodStartDate
    if (endDate) query.payPeriodEndDate.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
  }

  // TODO: Add pagination
  const records = await PayrollRecord.find(query)
    .populate('crewMember', 'name email role')
    .populate('generatedBy', 'name email')
    .sort({ payPeriodEndDate: -1, createdAt: -1 });

  res.json(records);
});

/**
 * @desc    Get payroll records for a specific crew member
 * @route   GET /api/payroll/records/crew/:userId
 * @access  Private (Admin/Staff or the crew member themselves)
 */
const getCrewMemberPayrollRecords = asyncHandler(async (req, res) => {
  const crewUserId = req.params.userId;

  // Authorization: Check if logged-in user is admin/staff or the crew member themselves
  if (req.user.role !== 'admin' && req.user.role !== 'route_marshal' && req.user._id.toString() !== crewUserId) {
    // Assuming 'route_marshal' is a placeholder for a staff role with payroll access
    res.status(403);
    throw new Error('Not authorized to view these payroll records.');
  }

  const records = await PayrollRecord.find({ crewMember: crewUserId })
    .populate('crewMember', 'name email role')
    .populate('generatedBy', 'name email')
    .sort({ payPeriodEndDate: -1, createdAt: -1 });

  if (records.length === 0) {
    const user = await User.findById(crewUserId);
    if (!user) {
        res.status(404);
        throw new Error(`User with ID ${crewUserId} not found.`);
    }
  }
  res.json(records);
});

/**
 * @desc    Get a single payroll record by its ID
 * @route   GET /api/payroll/records/:id
 * @access  Private (Admin/Staff or concerned crew member for their own)
 */
const getPayrollRecordById = asyncHandler(async (req, res) => {
  const record = await PayrollRecord.findById(req.params.id)
    .populate('crewMember', 'name email role')
    .populate('generatedBy', 'name email');

  if (!record) {
    res.status(404);
    throw new Error('Payroll record not found.');
  }

  // Authorization: Allow admin/staff or the specific crew member to view their own record
  if (req.user.role !== 'admin' && req.user.role !== 'route_marshal' && req.user._id.toString() !== record.crewMember._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this payroll record.');
  }

  res.json(record);
});

/**
 * @desc    Update a payroll record (e.g., change status, add notes, correct details)
 * @route   PUT /api/payroll/records/:id
 * @access  Private (Admin/Payroll Staff)
 */
const updatePayrollRecord = asyncHandler(async (req, res) => {
  const record = await PayrollRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Payroll record not found.');
  }

  // Example updatable fields - expand as needed
  const {
    grossPay,
    deductions,
    paymentDate,
    paymentMethod,
    referenceNumber,
    status,
    notes,
    basisOfPayment,
    // crewMember, payPeriodStartDate, payPeriodEndDate - changing these might need re-calculation and careful consideration
  } = req.body;

  if (grossPay !== undefined) record.grossPay = grossPay;
  if (deductions) record.deductions = deductions; // This will trigger pre-save to recalc totals
  if (paymentDate) record.paymentDate = paymentDate;
  if (paymentMethod) record.paymentMethod = paymentMethod;
  if (referenceNumber !== undefined) record.referenceNumber = referenceNumber;
  if (status) record.status = status;
  if (notes !== undefined) record.notes = notes;
  if (basisOfPayment) record.basisOfPayment = basisOfPayment;

  // The pre-save hook will recalculate deductionsTotal and netPay if grossPay or deductions change.

  // record.generatedBy = req.user._id; // Or have an 'updatedBy' field

  const updatedRecord = await record.save();
  const populatedRecord = await PayrollRecord.findById(updatedRecord._id)
    .populate('crewMember', 'name email role')
    .populate('generatedBy', 'name email'); // Consider populating updatedBy if added
  res.json(populatedRecord);
});

// No DELETE for payroll records typically, maybe a 'cancel' status or voiding mechanism.
// If deletion is truly needed:
// const deletePayrollRecord = asyncHandler(async (req, res) => { ... });

module.exports = {
  createPayrollRecord,
  getAllPayrollRecords,
  getCrewMemberPayrollRecords,
  getPayrollRecordById,
  updatePayrollRecord,
};
