const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/authController'); // Changed from userController to authController based on creation
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require token)
router.get('/me', protect, getUserProfile); // Get current logged-in user's profile

// Admin protected routes
router.get('/', protect, authorize('admin'), getUsers); // Get all users

router
  .route('/:id')
  .get(protect, authorize('admin'), getUserById)      // Get user by ID
  .put(protect, updateUser) // Admin can update any user, regular user can update their own. Logic in controller.
  .delete(protect, authorize('admin'), deleteUser);   // Delete user by ID

module.exports = router;
