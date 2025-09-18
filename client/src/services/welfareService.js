import axios from 'axios';

const API_URL = 'http://localhost:18080/api/welfare/contributions'; // Base URL for welfare contributions

// Axios instance should already be configured with Authorization header
// by authService/AuthContext if a user is logged in.

/**
 * Record a new welfare contribution
 * @param {object} contributionData - Data for the new contribution
 */
const recordContribution = async (contributionData) => {
  try {
    const response = await axios.post(API_URL, contributionData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not record contribution: ${message}`);
  }
};

/**
 * Get all welfare contributions (with optional filters)
 * @param {object} filters - Optional filters (memberId, startDate, endDate, type)
 */
const getAllContributions = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch contributions: ${message}`);
  }
};

/**
 * Get contributions for a specific member
 * @param {string} userId - The User ID of the member
 */
const getMemberContributions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/member/${userId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch member contributions: ${message}`);
  }
};

/**
 * Get a single welfare contribution by its ID
 * @param {string} contributionId - The ID of the contribution
 */
const getContributionById = async (contributionId) => {
  try {
    const response = await axios.get(`${API_URL}/${contributionId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch contribution ${contributionId}: ${message}`);
  }
};


/**
 * Update a welfare contribution
 * @param {string} contributionId - The ID of the contribution to update
 * @param {object} contributionData - The updated contribution data
 */
const updateContribution = async (contributionId, contributionData) => {
  try {
    const response = await axios.put(`${API_URL}/${contributionId}`, contributionData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not update contribution ${contributionId}: ${message}`);
  }
};

/**
 * Delete a welfare contribution
 * @param {string} contributionId - The ID of the contribution to delete
 */
const deleteContribution = async (contributionId) => {
  try {
    const response = await axios.delete(`${API_URL}/${contributionId}`);
    return response.data; // Usually a success message
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not delete contribution ${contributionId}: ${message}`);
  }
};

const welfareService = {
  recordContribution,
  getAllContributions,
  getMemberContributions,
  getContributionById,
  updateContribution,
  deleteContribution,
};

export default welfareService;
