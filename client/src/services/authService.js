import axios from 'axios';

const API_URL = '/api/users'; // Using proxy, so relative path

// Set token in axios defaults if available (e.g. on app load)
// This can be done once in a central place, like AuthContext or main App component.
// For now, we assume it's handled by AuthContext or when token is received.
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    // Backend currently doesn't return user/token on register, just success.
    // If it did, we could return response.data here.
    return { success: true, data: response.data }; // Assuming response.data is minimal like { message: 'User registered'}
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // throw new Error(message); // Or return an error object
    return { success: false, error: message };
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data && response.data.token) {
      localStorage.setItem('psv_token', response.data.token);
      setAuthToken(response.data.token); // Set token for subsequent requests
    }
    return response.data; // Should be { _id, name, email, role, token, ... }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // throw new Error(message);
    // To be consistent with register, return error object
    // However, login in context expects to throw or for error to be on err.response.data.message
    // For now, let's rethrow so AuthContext catches it as it was.
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('psv_token');
  setAuthToken(null); // Clear auth header
};

const getCurrentUser = async () => {
    // Token should already be set in axios headers by AuthContext or login service
    try {
        const response = await axios.get(`${API_URL}/me`);
        return response.data;
    } catch (error) {
        // If token is invalid or expired, backend will send 401.
        // This service can just rethrow or return null/error.
        console.error("Error fetching current user:", error);
        throw error; // Let AuthContext handle this
    }
};


const authService = {
  setAuthToken, // Expose if needed externally, though mostly internal to auth flow
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
