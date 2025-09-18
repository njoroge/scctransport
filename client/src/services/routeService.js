import axios from 'axios';

const API_URL = 'http://localhost:18080/api/routes';

// Axios instance should be configured with Authorization header

/**
 * Get all defined routes
 */
const getAllRoutes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch routes: ${message}`);
  }
};

/**
 * Create a new route definition
 * @param {object} routeData - The route data
 */
const createRoute = async (routeData) => {
  try {
    const response = await axios.post(API_URL, routeData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not create route: ${message}`);
  }
};

// Add getRouteByIdOrName, updateRoute, deleteRoute later

const deleteRoute = async (routeId) => {
  try {
    await axios.delete(`${API_URL}/${routeId}`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not delete route: ${message}`);
  }
};

const routeService = {
  getAllRoutes,
  createRoute,
  deleteRoute,
  // getRouteByIdOrName,
  // updateRoute,
};

export default routeService;
