const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  updateEmployee,
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');

const canManageEmployees = authorize('admin', 'route_marshal');

router
  .route('/')
  .post(protect, canManageEmployees, createEmployee)
  .get(protect, canManageEmployees, getEmployees);

router
  .route('/:id')
  .put(protect, canManageEmployees, updateEmployee);

module.exports = router;
