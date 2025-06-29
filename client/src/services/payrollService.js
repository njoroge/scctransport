import axios from 'axios';

const API_URL = '/api/payroll/records'; // Base URL for payroll records

// Axios instance should be configured with Authorization header by AuthContext

/**
 * Create a new payroll record
 * @param {object} payrollData - Data for the new payroll record
 */
const createPayrollRecord = async (payrollData) => {
  try {
    const response = await axios.post(API_URL, payrollData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not create payroll record: ${message}`);
  }
};

/**
 * Get all payroll records (with optional filters)
 * @param {object} filters - Optional filters (crewMemberId, status, startDate, endDate)
 */
const getAllPayrollRecords = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch payroll records: ${message}`);
  }
};

/**
 * Get payroll records for a specific crew member
 * @param {string} userId - The User ID of the crew member
 */
const getCrewMemberPayrollRecords = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/crew/${userId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch crew member payroll records: ${message}`);
  }
};

/**
 * Get a single payroll record by its ID
 * @param {string} recordId - The ID of the payroll record
 */
const getPayrollRecordById = async (recordId) => {
  try {
    const response = await axios.get(`${API_URL}/${recordId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not fetch payroll record ${recordId}: ${message}`);
  }
};

/**
 * Update a payroll record
 * @param {string} recordId - The ID of the payroll record to update
 * @param {object} payrollData - The updated payroll data
 */
const updatePayrollRecord = async (recordId, payrollData) => {
  try {
    const response = await axios.put(`${API_URL}/${recordId}`, payrollData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(`Could not update payroll record ${recordId}: ${message}`);
  }
};

// Delete is typically not done for payroll; status is changed to 'Cancelled' or 'Void' via update.

const payrollService = {
  createPayrollRecord,
  getAllPayrollRecords,
  getCrewMemberPayrollRecords,
  getPayrollRecordById,
  updatePayrollRecord,
};

export default payrollService;
