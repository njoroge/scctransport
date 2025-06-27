import axios from 'axios';

const API_URL = '/api/vehicles'; // Using proxy

// Axios instance is already configured with Authorization header by authService/AuthContext
// if a user is logged in.

/**
 * Get all vehicles
 * @param {string} token - Optional: Can be passed if not relying on global axios config
 */
const getAllVehicles = async (token) => {
  // Example of setting token per request if not globally set or needs override
  // const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  try {
    const response = await axios.get(API_URL); // config
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch vehicles: ${message}`);
  }
};

/**
 * Create a new vehicle
 * @param {object} vehicleData - The vehicle data to create
 * @param {string} token - Optional: Can be passed if not relying on global axios config
 */
const createVehicle = async (vehicleData, token) => {
  // const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  try {
    const response = await axios.post(API_URL, vehicleData); // config
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not create vehicle: ${message}`);
  }
};

/**
 * Get a single vehicle by its ID
 * @param {string} id - The ID of the vehicle
 * @param {string} token - Optional
 */
const getVehicleById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch vehicle ${id}: ${message}`);
  }
};

/**
 * Update an existing vehicle
 * @param {string} id - The ID of the vehicle to update
 * @param {object} vehicleData - The vehicle data to update
 * @param {string} token - Optional
 */
const updateVehicle = async (id, vehicleData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not update vehicle ${id}: ${message}`);
  }
};


/**
 * Delete a vehicle by its ID
 * @param {string} id - The ID of the vehicle to delete
 * @param {string} token - Optional
 */
const deleteVehicle = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Usually a success message like { message: "Vehicle removed" }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not delete vehicle ${id}: ${message}`);
  }
};


const vehicleService = {
  getAllVehicles,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};

export default vehicleService;
