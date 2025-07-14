const CrewProfile = require('../models/CrewProfileModel');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Create a new crew profile
 * @route   POST /api/crew-profiles
 * @access  Private (Admin or authorized personnel)
 */
const createCrewProfile = asyncHandler(async (req, res) => {
  const {
    user, // User ID to link this profile to
    psvLicenseNumber,
    psvLicenseExpiry,
    nationalId,
    phoneNumber, // Crew specific phone, might differ from User.phoneNumber
    dateOfBirth,
    address,
    nextOfKinName,
    nextOfKinPhone,
    employmentDate,
    photoUrl,
    remarks,
  } = req.body;

  if (!user || !psvLicenseNumber || !psvLicenseExpiry || !nationalId || !phoneNumber) {
    res.status(400);
    throw new Error('Missing required fields: user, psvLicenseNumber, psvLicenseExpiry, nationalId, phoneNumber.');
  }

  // Check if user exists and has an appropriate role
  const userAccount = await User.findById(user);
  if (!userAccount) {
    res.status(404);
    throw new Error(`User with ID ${user} not found.`);
  }
  if (!['driver', 'conductor', 'route_marshal', 'mechanic'].includes(userAccount.role)) {
    res.status(400);
    throw new Error(`User ${userAccount.name} does not have a valid crew role (driver, conductor, route_marshal, mechanic).`);
  }

  // Check if a crew profile already exists for this user
  const existingProfileForUser = await CrewProfile.findOne({ user });
  if (existingProfileForUser) {
    res.status(400);
    throw new Error(`A crew profile already exists for user ${userAccount.name}.`);
  }

  // Check for uniqueness of PSV license and National ID
  const existingPsvLicense = await CrewProfile.findOne({ psvLicenseNumber });
  if (existingPsvLicense) {
    res.status(400);
    throw new Error(`PSV License number ${psvLicenseNumber} is already registered.`);
  }
  const existingNationalId = await CrewProfile.findOne({ nationalId });
  if (existingNationalId) {
    res.status(400);
    throw new Error(`National ID ${nationalId} is already registered.`);
  }

  const crewProfile = new CrewProfile({
    user,
    psvLicenseNumber,
    psvLicenseExpiry,
    nationalId,
    phoneNumber,
    dateOfBirth,
    address,
    nextOfKinName,
    nextOfKinPhone,
    employmentDate,
    photoUrl,
    remarks,
    createdBy: req.user._id,
  });

  const createdCrewProfile = await crewProfile.save();
  // Populate user details in the response
  const populatedProfile = await CrewProfile.findById(createdCrewProfile._id)
                                            .populate('user', 'name email role memberId');
  res.status(201).json(populatedProfile);
});

/**
 * @desc    Get all crew profiles
 * @route   GET /api/crew-profiles
 * @access  Private
 */
const getAllCrewProfiles = asyncHandler(async (req, res) => {
  const { role } = req.query;
  let query = {};
  if (role) {
    // This requires a more complex query because the role is on the populated 'user' document.
    // One way is to find users with the role first, then find profiles for those users.
    const usersWithRole = await User.find({ role }).select('_id');
    const userIds = usersWithRole.map(user => user._id);
    query.user = { $in: userIds };
  }

  const profiles = await CrewProfile.find(query)
    .populate('user', 'name email role memberId isActive') // Populate user details
    .populate('createdBy', 'name');
  res.json(profiles);
});

/**
 * @desc    Get a single crew profile by User ID
 * @route   GET /api/crew-profiles/:userId
 * @access  Private
 */
const getCrewProfileByUserId = asyncHandler(async (req, res) => {
  const profile = await CrewProfile.findOne({ user: req.params.userId })
    .populate('user', 'name email role memberId isActive phoneNumber')
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');

  if (profile) {
    res.json(profile);
  } else {
    // Check if user exists but has no profile
    const userExists = await User.findById(req.params.userId);
    if (userExists) {
        res.status(404);
        throw new Error(`Crew profile not found for user ${userExists.name}.`);
    } else {
        res.status(404);
        throw new Error(`User with ID ${req.params.userId} not found.`);
    }
  }
});

/**
 * @desc    Update a crew profile by User ID
 * @route   PUT /api/crew-profiles/:userId
 * @access  Private (Admin or authorized personnel)
 */
const updateCrewProfile = asyncHandler(async (req, res) => {
  const profile = await CrewProfile.findOne({ user: req.params.userId });

  if (!profile) {
    res.status(404);
    throw new Error('Crew profile not found for this user.');
  }

  // Fields that can be updated
  const {
    psvLicenseNumber,
    psvLicenseExpiry,
    nationalId, // Usually not updatable, but included for completeness
    phoneNumber,
    dateOfBirth,
    address,
    nextOfKinName,
    nextOfKinPhone,
    employmentDate, // Might be updatable by admin
    photoUrl,
    remarks,
    isActive, // Admin can activate/deactivate crew profile
  } = req.body;

  // Check for uniqueness if PSV license or National ID are being changed
  if (psvLicenseNumber && psvLicenseNumber !== profile.psvLicenseNumber) {
    const existingPsvLicense = await CrewProfile.findOne({ psvLicenseNumber });
    if (existingPsvLicense) {
      res.status(400);
      throw new Error(`PSV License number ${psvLicenseNumber} is already registered to another profile.`);
    }
    profile.psvLicenseNumber = psvLicenseNumber;
  }
  if (nationalId && nationalId !== profile.nationalId) {
    const existingNationalId = await CrewProfile.findOne({ nationalId });
    if (existingNationalId) {
      res.status(400);
      throw new Error(`National ID ${nationalId} is already registered to another profile.`);
    }
    profile.nationalId = nationalId;
  }

  if (psvLicenseExpiry) profile.psvLicenseExpiry = psvLicenseExpiry;
  if (phoneNumber) profile.phoneNumber = phoneNumber;
  if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
  if (address) profile.address = address;
  if (nextOfKinName) profile.nextOfKinName = nextOfKinName;
  if (nextOfKinPhone) profile.nextOfKinPhone = nextOfKinPhone;
  if (employmentDate) profile.employmentDate = employmentDate; // Consider role restrictions for this
  if (photoUrl) profile.photoUrl = photoUrl;
  if (remarks) profile.remarks = remarks;
  if (typeof isActive === 'boolean') profile.isActive = isActive; // Allow setting to true or false

  profile.updatedBy = req.user._id;
  const updatedProfile = await profile.save();

  const populatedProfile = await CrewProfile.findById(updatedProfile._id)
                                            .populate('user', 'name email role memberId');
  res.json(populatedProfile);
});

/**
 * @desc    Delete a crew profile by User ID
 * @route   DELETE /api/crew-profiles/:userId
 * @access  Private (Admin)
 */
const deleteCrewProfile = asyncHandler(async (req, res) => {
  const profile = await CrewProfile.findOne({ user: req.params.userId });

  if (profile) {
    // Before deleting, check if crew is assigned to any active vehicle.
    // If so, might need to unassign them first or prevent deletion.
    // For now, direct deletion.
    await profile.remove();
    res.json({ message: 'Crew profile removed successfully.' });
  } else {
    res.status(404);
    throw new Error('Crew profile not found for this user.');
  }
});

module.exports = {
  createCrewProfile,
  getAllCrewProfiles,
  getCrewProfileByUserId,
  updateCrewProfile,
  deleteCrewProfile,
};
