import axios from 'axios';

// Helper to get the auth token from localStorage (or AuthContext if preferred)
const getAuthToken = () => {
  return localStorage.getItem('psv_token'); // Assuming token is stored under 'psv_token'
};

// Vite exposes environment variables through import.meta.env
// Variables must be prefixed with VITE_ in your .env file (e.g., VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Submits ID details for verification.
 * @param {object} idData - The ID data to submit.
 * @param {string} idData.nationalIdNumber - National ID number.
 * @param {string} idData.fullNameOnId - Full name as on ID.
 * @param {string} idData.dobOnId - Date of birth as on ID (YYYY-MM-DD).
 * @returns {Promise<object>} The response from the API.
 */
export const submitIdForVerification = async (idData) => {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: 'Authentication token not found.' };
  }

  try {
    const response = await axios.post(
      `${API_URL}/verification/submit-id`,
      idData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, ...response.data }; // Assuming backend returns { message, idVerificationStatus, details }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return { success: false, message, details: error.response?.data?.details };
  }
};

/**
 * Fetches the current user's ID verification status.
 * @returns {Promise<object>} The verification status data from the API.
 */
export const fetchVerificationStatus = async () => {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: 'Authentication token not found.' };
  }

  try {
    const response = await axios.get(`${API_URL}/verification/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data }; // Assuming backend returns the idVerification sub-document
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return { success: false, message };
  }
};
