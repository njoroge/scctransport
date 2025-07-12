import axios from 'axios';

const API_URL = '/api/gps'; // Adjust if your API endpoint is different

// Fetch the latest GPS data for all vehicles
export const getLatestGpsData = async () => {
  try {
    // This will be the actual API call
    // const response = await axios.get(`${API_URL}/latest`);
    // return response.data;

    // For now, returning dummy data
    console.log("Fetching latest GPS data (dummy)...");
    return [
      { id: 1, name: 'Vehicle A', position: [-1.286389, 36.817223], timestamp: new Date() },
      { id: 2, name: 'Vehicle B', position: [-1.292066, 36.821945], timestamp: new Date() },
      { id: 3, name: 'Vehicle C', position: [-1.283253, 36.816667], timestamp: new Date() },
    ];
  } catch (error) {
    console.error('Error fetching latest GPS data:', error);
    throw error;
  }
};

// Fetch GPS data for a specific vehicle
export const getGpsDataForVehicle = async (vehicleId) => {
  try {
    // const response = await axios.get(`${API_URL}/${vehicleId}`);
    // return response.data;
    console.log(`Fetching GPS data for vehicle ${vehicleId} (dummy)...`);
    // Dummy data for a single vehicle
    return {
      id: vehicleId,
      name: `Vehicle ${vehicleId}`,
      position: [-1.286389, 36.817223], // Static for now
      history: [
        { position: [-1.285, 36.815], timestamp: new Date(Date.now() - 60000 * 5) },
        { position: [-1.286389, 36.817223], timestamp: new Date() },
      ]
    };
  } catch (error) {
    console.error(`Error fetching GPS data for vehicle ${vehicleId}:`, error);
    throw error;
  }
};
