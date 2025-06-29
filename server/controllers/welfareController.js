const WelfareContribution = require('../models/WelfareContributionModel');
const User = require('../models/UserModel'); // For validating member
const asyncHandler = require('express-async-handler');

/**
 * @desc    Record a new welfare contribution
 * @route   POST /api/welfare/contributions
 * @access  Private (Admin/Staff)
 */
const recordContribution = asyncHandler(async (req, res) => {
  const {
    member, // User ID of the Sacco member
    contributionDate,
    amount,
    contributionType,
    paymentMethod,
    referenceNumber,
    remarks,
  } = req.body;

  if (!member || !amount || !contributionType || !paymentMethod) {
    res.status(400);
    throw new Error('Missing required fields: member, amount, contributionType, paymentMethod.');
  }

  // The 'member' user validation (is a sacco_member) is handled by pre-save hook in the model.
  // We might still want to check if user exists here for a quicker response.
  const memberUser = await User.findById(member);
  if (!memberUser) {
    res.status(404);
    throw new Error(`Member (User ID: ${member}) not found.`);
  }
   if (memberUser.role !== 'sacco_member') { // Redundant if pre-save hook is robust, but good for early exit
    res.status(400);
    throw new Error(`User ${memberUser.name} is not a SACCO member.`);
  }


  // Check for duplicate referenceNumber if it's meant to be unique and provided
  if (referenceNumber) {
    const existingByRef = await WelfareContribution.findOne({ referenceNumber });
    if (existingByRef) {
        res.status(400);
        throw new Error(`A contribution with reference number '${referenceNumber}' already exists.`);
    }
  }

  const contribution = new WelfareContribution({
    member,
    contributionDate,
    amount,
    contributionType,
    paymentMethod,
    referenceNumber,
    remarks,
    recordedBy: req.user._id, // Logged-in user recording this
  });

  const createdContribution = await contribution.save();
  const populatedContribution = await WelfareContribution.findById(createdContribution._id)
    .populate('member', 'name email memberId')
    .populate('recordedBy', 'name email');
  res.status(201).json(populatedContribution);
});

/**
 * @desc    Get all welfare contributions
 * @route   GET /api/welfare/contributions
 * @access  Private (Admin/Staff)
 */
const getAllContributions = asyncHandler(async (req, res) => {
  const { memberId, startDate, endDate, type } = req.query;
  let query = {};

  if (memberId) {
    // If memberId is a User._id
     query.member = memberId;
    // If memberId is the Sacco's custom memberId string, you'd need to find the User first
    // const user = await User.findOne({ memberId: memberIdFromQuery });
    // if (user) query.member = user._id; else return res.json([]); // or handle error
  }
  if (startDate || endDate) {
    query.contributionDate = {};
    if (startDate) query.contributionDate.$gte = new Date(startDate);
    if (endDate) query.contributionDate.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999)); // End of day
  }
  if (type) {
    query.contributionType = type;
  }

  // TODO: Add pagination
  const contributions = await WelfareContribution.find(query)
    .populate('member', 'name email memberId') // Populate member details
    .populate('recordedBy', 'name email')   // Populate recorder details
    .sort({ contributionDate: -1, createdAt: -1 }); // Sort by date descending

  res.json(contributions);
});

/**
 * @desc    Get contributions for a specific member
 * @route   GET /api/welfare/contributions/member/:userId
 * @access  Private (Admin/Staff or the member themselves)
 */
const getMemberContributions = asyncHandler(async (req, res) => {
  const memberUserId = req.params.userId;

  // Authorization: Check if logged-in user is admin or the member themselves
  if (req.user.role !== 'admin' && req.user._id.toString() !== memberUserId) {
    // Add check for 'sacco_staff' role if that's a role that can view this
    res.status(403);
    throw new Error('Not authorized to view these contributions.');
  }

  const contributions = await WelfareContribution.find({ member: memberUserId })
    .populate('member', 'name email memberId')
    .populate('recordedBy', 'name email')
    .sort({ contributionDate: -1, createdAt: -1 });

  if (contributions.length === 0) {
    // Check if user exists to give a more specific message
    const user = await User.findById(memberUserId);
    if (!user) {
        res.status(404);
        throw new Error(`User with ID ${memberUserId} not found.`);
    }
    // If user exists but no contributions
    // res.status(200).json([]); // Or a message: { message: 'No contributions found for this member.'}
  }
  res.json(contributions);
});


/**
 * @desc    Get a single welfare contribution by its ID
 * @route   GET /api/welfare/contributions/:id
 * @access  Private (Admin/Staff)
 */
const getContributionById = asyncHandler(async (req, res) => {
    const contribution = await WelfareContribution.findById(req.params.id)
        .populate('member', 'name email memberId')
        .populate('recordedBy', 'name email');

    if (contribution) {
        res.json(contribution);
    } else {
        res.status(404);
        throw new Error('Welfare contribution not found.');
    }
});


/**
 * @desc    Update a welfare contribution
 * @route   PUT /api/welfare/contributions/:id
 * @access  Private (Admin/Staff)
 */
const updateContribution = asyncHandler(async (req, res) => {
  const contribution = await WelfareContribution.findById(req.params.id);

  if (!contribution) {
    res.status(404);
    throw new Error('Welfare contribution not found.');
  }

  // Fields that can be updated
  const {
    member, // Be cautious about changing the member of an existing contribution
    contributionDate,
    amount,
    contributionType,
    paymentMethod,
    referenceNumber,
    remarks,
  } = req.body;

  if (member && member.toString() !== contribution.member.toString()) {
    const memberUser = await User.findById(member);
    if (!memberUser) {
        res.status(404);
        throw new Error(`New member (User ID: ${member}) not found.`);
    }
    if (memberUser.role !== 'sacco_member') {
        res.status(400);
        throw new Error(`User ${memberUser.name} is not a SACCO member.`);
    }
    contribution.member = member;
  }

  if (referenceNumber && referenceNumber !== contribution.referenceNumber) {
    const existingByRef = await WelfareContribution.findOne({ referenceNumber, _id: { $ne: contribution._id } });
    if (existingByRef) {
        res.status(400);
        throw new Error(`Another contribution with reference number '${referenceNumber}' already exists.`);
    }
    contribution.referenceNumber = referenceNumber;
  } else if (req.body.hasOwnProperty('referenceNumber') && referenceNumber === '') { // Allow clearing ref number
      contribution.referenceNumber = undefined;
  }


  if (contributionDate) contribution.contributionDate = contributionDate;
  if (amount !== undefined) contribution.amount = amount; // Allow 0 amount if meaningful
  if (contributionType) contribution.contributionType = contributionType;
  if (paymentMethod) contribution.paymentMethod = paymentMethod;
  if (remarks !== undefined) contribution.remarks = remarks;

  contribution.recordedBy = req.user._id; // Or updatedBy field if you add one

  const updatedContribution = await contribution.save();
  const populatedContribution = await WelfareContribution.findById(updatedContribution._id)
    .populate('member', 'name email memberId')
    .populate('recordedBy', 'name email');
  res.json(populatedContribution);
});

/**
 * @desc    Delete a welfare contribution
 * @route   DELETE /api/welfare/contributions/:id
 * @access  Private (Admin/Staff)
 */
const deleteContribution = asyncHandler(async (req, res) => {
  const contribution = await WelfareContribution.findById(req.params.id);

  if (contribution) {
    await contribution.remove();
    res.json({ message: 'Welfare contribution removed successfully.' });
  } else {
    res.status(404);
    throw new Error('Welfare contribution not found.');
  }
});

module.exports = {
  recordContribution,
  getAllContributions,
  getMemberContributions,
  getContributionById,
  updateContribution,
  deleteContribution,
};
