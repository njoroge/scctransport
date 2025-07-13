import axios from 'axios';

const API_URL = '/api/gps-data';

// Fetch the latest GPS data for all vehicles
export const getLatestGpsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest GPS data:', error);
    throw error;
  }
};

// Fetch GPS data for a specific vehicle
export const getGpsDataForVehicle = async (vehicleId) => {
  try {
    const response = await axios.get(`${API_URL}/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching GPS data for vehicle ${vehicleId}:`, error);
    throw error;
  }
};

const gpsService = {
    getLatestGpsData,
    getGpsDataForVehicle,
};

export default gpsService;
