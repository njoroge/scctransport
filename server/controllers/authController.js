const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d', // Default to 30 days if not set in .env
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, memberId, phoneNumber } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    res.status(400); // Bad Request
    throw new Error('Please provide name, email, and password.');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with this email.');
  }

  // Check if memberId is provided and unique (if applicable for the role)
  if (memberId) {
      const memberIdExists = await User.findOne({ memberId });
      if (memberIdExists) {
          res.status(400);
          throw new Error('Member ID already exists.');
      }
  }

  // Create user object, password will be hashed by pre-save hook in UserModel
  const user = new User({
    name,
    email,
    password,
    role: role || 'sacco_member', // Default to 'sacco_member' if no role specified
    memberId,
    phoneNumber,
  });

  // Additional validation for role-specific fields might be needed here or in model
  if (user.role === 'sacco_member' && !user.memberId) {
    // Potentially auto-generate memberId or enforce it for sacco_members
    // For now, let's assume it can be set later if not provided at registration
  }


  const createdUser = await user.save();

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      memberId: createdUser.memberId,
      phoneNumber: createdUser.phoneNumber,
      token: generateToken(createdUser._id, createdUser.role),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password.');
  }

  // Find user by email (password is not selected by default)
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.comparePassword(password))) {
    if (!user.isActive) {
        res.status(403); // Forbidden
        throw new Error('Account is deactivated. Please contact administrator.');
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      memberId: user.memberId,
      idVerification: user.idVerification, // Include ID verification status
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password.');
  }
});

/**
 * @desc    Get current user profile
 * @route   GET /api/users/me
 * @access  Private (requires token)
 */
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by the 'protect' middleware
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      memberId: user.memberId,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive,
      createdAt: user.createdAt,
      idVerification: user.idVerification, // Include ID verification status
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    // TODO: Add pagination
    const users = await User.find({});
    res.json(users);
});

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc    Update user profile (or by admin)
 * @route   PUT /api/users/:id (or /api/users/profile for self-update)
 * @access  Private / Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
    const userIdToUpdate = req.params.id;
    const loggedInUser = req.user;

    // Check if the logged-in user is an admin or updating their own profile
    if (loggedInUser.role !== 'admin' && loggedInUser._id.toString() !== userIdToUpdate) {
        res.status(403);
        throw new Error('Not authorized to update this user.');
    }

    const user = await User.findById(userIdToUpdate);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Fields that can be updated
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email; // Admin might change email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (loggedInUser.role === 'admin') { // Admin only fields
        if (req.body.role) user.role = req.body.role;
        if (req.body.memberId) user.memberId = req.body.memberId; // Admin can set/change memberId
        if (typeof req.body.isActive !== 'undefined') user.isActive = req.body.isActive;
    }

    // If password is being updated
    if (req.body.password) {
        if (req.body.password.length < 6) {
            res.status(400);
            throw new Error('Password must be at least 6 characters long');
        }
        user.password = req.body.password; // Hash will be applied by pre-save hook
    }

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        memberId: updatedUser.memberId,
        phoneNumber: updatedUser.phoneNumber,
        isActive: updatedUser.isActive,
        // Do not return token here unless it's re-generated due to role change
    });
});


/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // Instead of full deletion, consider deactivating or marking as deleted
        // For now, we will remove. If this user owns vehicles or has crew profile,
        // those might need to be handled (e.g., unassign or prevent deletion).

        // Add checks here: e.g., cannot delete an admin if it's the only one.
        // Cannot delete a user who owns vehicles unless vehicles are reassigned/dealt with.

        await user.remove(); // Or user.isActive = false; await user.save();
        res.json({ message: 'User removed successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
