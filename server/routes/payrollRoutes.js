const express = require('express');
const router = express.Router();
const {
  createPayrollRecord,
  getAllPayrollRecords,
  getCrewMemberPayrollRecords,
  getPayrollRecordById,
  updatePayrollRecord,
} = require('../controllers/payrollController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Define roles that can manage payroll, e.g., 'admin', 'payroll_officer'
const canManagePayroll = authorize('admin', 'route_marshal'); // Using 'route_marshal' as a placeholder for a finance/staff role

// Create a new payroll record & Get all payroll records
router
  .route('/records')
  .post(protect, canManagePayroll, createPayrollRecord)
  .get(protect, canManagePayroll, getAllPayrollRecords);

// Get payroll records for a specific crew member
// Crew member can also view their own payroll records (handled in controller)
router.get('/records/crew/:userId', protect, getCrewMemberPayrollRecords);

// Operations on a single payroll record by its ID
// Crew member can view their own specific record (handled in controller)
router
  .route('/records/:id')
  .get(protect, getPayrollRecordById)
  .put(protect, canManagePayroll, updatePayrollRecord);
  // No DELETE endpoint for now, prefer changing status to 'Cancelled' or 'Void'

module.exports = router;
