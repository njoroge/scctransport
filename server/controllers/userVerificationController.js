const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const idVerificationService = require('../services/idVerificationService');

/**
 * @desc    Submit user's National ID details for verification
 * @route   POST /api/verification/submit-id
 * @access  Private (user must be logged in)
 */
const submitIdVerificationDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming protect middleware adds user to req

  const { nationalIdNumber, fullNameOnId, dobOnId } = req.body;

  if (!nationalIdNumber || !fullNameOnId || !dobOnId) {
    res.status(400);
    throw new Error('Please provide National ID number, full name on ID, and date of birth on ID.');
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found.');
  }

  // Update user record with submitted details and set status to pending
  user.idVerification.nationalIdNumber = nationalIdNumber;
  user.idVerification.fullNameOnId = fullNameOnId;
  user.idVerification.dobOnId = new Date(dobOnId); // Ensure it's a Date object
  user.idVerification.status = 'pending';
  user.idVerification.lastAttemptAt = new Date();
  user.idVerification.remarks = 'Verification pending with provider.';

  await user.save(); // Save initial submission before calling service

  try {
    // Call the verification service
    const verificationResult = await idVerificationService.verifyIdDetails(
      userId,
      nationalIdNumber,
      fullNameOnId,
      user.idVerification.dobOnId
    );

    user.idVerification.lastAttemptAt = new Date(); // Update attempt time again after service call
    user.idVerification.providerReference = verificationResult.reference;

    if (verificationResult.success) {
      user.idVerification.status = verificationResult.status; // 'verified', 'failed', 'needs_review'
      if (verificationResult.status === 'verified') {
        user.idVerification.verifiedAt = new Date();
        user.idVerification.remarks = 'ID successfully verified.';
      } else {
        user.idVerification.remarks = verificationResult.error || 'Verification returned non-verified status.';
      }
    } else {
      // The service itself had an issue (e.g., API key error, network issue with provider)
      user.idVerification.status = 'failed';
      user.idVerification.remarks = verificationResult.error || 'Failed to process verification with provider.';
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'ID verification process updated.',
      idVerificationStatus: updatedUser.idVerification.status,
      details: updatedUser.idVerification,
    });

  } catch (error) {
    // Catch errors from the service call or saving user
    console.error('Error during ID verification process:', error);
    user.idVerification.status = 'failed';
    user.idVerification.remarks = `Internal error during verification: ${error.message}`;
    await user.save(); // Save error state
    res.status(500);
    throw new Error('An error occurred while processing your ID verification.');
  }
});

/**
 * @desc    Get current user's ID verification status
 * @route   GET /api/verification/status
 * @access  Private (user must be logged in)
 */
const getVerificationStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select('+idVerification.nationalIdNumber'); // Example if you want to return it, otherwise keep it hidden by default

  if (!user) {
    res.status(404);
    throw new Error('User not found.');
  }

  // Decide what information to send back. Avoid sending sensitive data unless necessary.
  // For now, sending most of the sub-document for transparency during development.
  // In production, you might restrict this.
  res.status(200).json({
    status: user.idVerification.status,
    nationalIdNumber: user.idVerification.nationalIdNumber, // Be cautious about returning this
    fullNameOnId: user.idVerification.fullNameOnId,
    dobOnId: user.idVerification.dobOnId,
    lastAttemptAt: user.idVerification.lastAttemptAt,
    verifiedAt: user.idVerification.verifiedAt,
    providerReference: user.idVerification.providerReference,
    remarks: user.idVerification.remarks,
  });
});

module.exports = {
  submitIdVerificationDetails,
  getVerificationStatus,
};
