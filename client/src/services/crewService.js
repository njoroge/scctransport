import axios from 'axios';

const API_URL = 'http://localhost:18080/api/crew-profiles';

// Axios instance should already be configured with Authorization header by authService/AuthContext

/**
 * Get all crew profiles
 */
const getAllCrewProfiles = async (role) => {
  try {
    const params = role ? { params: { role } } : {};
    const response = await axios.get(API_URL, params);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch crew profiles: ${message}`);
  }
};

/**
 * Create a new crew profile
 * @param {object} profileData - The crew profile data
 */
const createCrewProfile = async (profileData) => {
  try {
    const response = await axios.post(API_URL, profileData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not create crew profile: ${message}`);
  }
};

// Add getCrewProfileByUserId, updateCrewProfile, deleteCrewProfile later

const crewService = {
  getAllCrewProfiles,
  createCrewProfile,
  // getCrewProfileByUserId,
  // updateCrewProfile,
  // deleteCrewProfile
};

export default crewService;
