const express = require('express');
const router = express.Router();
const {
  submitIdVerificationDetails,
  getVerificationStatus,
} = require('../controllers/userVerificationController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have this middleware to protect routes

// Route to submit ID details for verification
// POST /api/verification/submit-id
router.post('/submit-id', protect, submitIdVerificationDetails);

// Route to get the current user's ID verification status
// GET /api/verification/status
router.get('/status', protect, getVerificationStatus);

module.exports = router;
