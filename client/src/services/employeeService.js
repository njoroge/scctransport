import axios from 'axios';

const API_URL = 'http://localhost:18080/api/employees';

// Axios instance should be configured with Authorization header by AuthContext

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not create employee: ${message}`);
  }
};

const getAllEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch employees: ${message}`);
  }
};

const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not update employee ${employeeId}: ${message}`);
  }
};

const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
};

export default employeeService;
