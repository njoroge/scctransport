const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Adjust path as necessary
// Utility to handle async errors in Express routes
const asyncHandler = require('express-async-handler');


// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401); // Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401); // Unauthorized
    throw new Error('Not authorized, no token');
  }
});

// Middleware to authorize based on roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403); // Forbidden
      throw new Error(`User role '${req.user ? req.user.role : 'guest'}' is not authorized to access this route. Allowed roles: ${roles.join(', ')}`);
    }
    next();
  };
};

module.exports = { protect, authorize };
