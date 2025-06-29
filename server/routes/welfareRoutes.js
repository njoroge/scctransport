const express = require('express');
const router = express.Router();
const {
  recordContribution,
  getAllContributions,
  getMemberContributions,
  getContributionById,
  updateContribution,
  deleteContribution,
} = require('../controllers/welfareController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Define roles that can manage welfare contributions, e.g., 'admin', 'finance_officer'
const canManageWelfare = authorize('admin', 'route_marshal'); // Using 'route_marshal' as a placeholder for a finance/staff role for now

// Record a new contribution & Get all contributions
router
  .route('/contributions')
  .post(protect, canManageWelfare, recordContribution)
  .get(protect, canManageWelfare, getAllContributions);

// Get contributions for a specific member
// Member can also view their own contributions
router.get('/contributions/member/:userId', protect, getMemberContributions);

// Operations on a single contribution by its ID
router
  .route('/contributions/:id')
  .get(protect, canManageWelfare, getContributionById) // Or allow member to view their own?
  .put(protect, canManageWelfare, updateContribution)
  .delete(protect, canManageWelfare, deleteContribution);

module.exports = router;
