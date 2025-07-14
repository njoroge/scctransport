const User = require('../models/UserModel');
const CrewProfile = require('../models/CrewProfileModel');
const asyncHandler = require('express-async-handler');

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private (Admin)
const createEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phoneNumber,
    kraPin,
    nssfNumber,
    nhifNumber,
    bankName,
    branchName,
    accountNumber,
    employmentType,
    startDate,
    endDate,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    phoneNumber,
    idVerification: {
      kraPin,
      nssfNumber,
      nhifNumber,
    },
    bankDetails: {
      bankName,
      branchName,
      accountNumber,
    },
  });

  if (user) {
    const crewProfile = await CrewProfile.create({
      user: user._id,
      employmentType,
      startDate,
      endDate,
      // Add other crew profile fields if necessary
    });

    res.status(201).json({
      ...user.toObject(),
      crewProfile,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private (Admin)
const getEmployees = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate('crewProfile');
  res.json(users);
});

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private (Admin)
const updateEmployee = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      user.password = req.body.password;
    }

    user.idVerification.kraPin = req.body.kraPin || user.idVerification.kraPin;
    user.idVerification.nssfNumber = req.body.nssfNumber || user.idVerification.nssfNumber;
    user.idVerification.nhifNumber = req.body.nhifNumber || user.idVerification.nhifNumber;

    user.bankDetails.bankName = req.body.bankName || user.bankDetails.bankName;
    user.bankDetails.branchName = req.body.branchName || user.bankDetails.branchName;
    user.bankDetails.accountNumber = req.body.accountNumber || user.bankDetails.accountNumber;

    const updatedUser = await user.save();

    const crewProfile = await CrewProfile.findOne({ user: updatedUser._id });

    if (crewProfile) {
      crewProfile.employmentType = req.body.employmentType || crewProfile.employmentType;
      crewProfile.startDate = req.body.startDate || crewProfile.startDate;
      crewProfile.endDate = req.body.endDate || crewProfile.endDate;
      await crewProfile.save();
    }

    res.json({
      ...updatedUser.toObject(),
      crewProfile,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
};
