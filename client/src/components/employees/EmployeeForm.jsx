import React, { useState, useEffect } from 'react';
import employeeService from '../../services/employeeService';

const EmployeeForm = ({ onEmployeeAddedOrUpdated, editingEmployee, clearEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'driver',
    phoneNumber: '',
    kraPin: '',
    nssfNumber: '',
    nhifNumber: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    employmentType: 'permanent',
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || '',
        email: editingEmployee.email || '',
        password: '',
        role: editingEmployee.role || 'driver',
        phoneNumber: editingEmployee.phoneNumber || '',
        kraPin: editingEmployee.idVerification?.kraPin || '',
        nssfNumber: editingEmployee.idVerification?.nssfNumber || '',
        nhifNumber: editingEmployee.idVerification?.nhifNumber || '',
        bankName: editingEmployee.bankDetails?.bankName || '',
        branchName: editingEmployee.bankDetails?.branchName || '',
        accountNumber: editingEmployee.bankDetails?.accountNumber || '',
        employmentType: editingEmployee.crewProfile?.employmentType || 'permanent',
        startDate: editingEmployee.crewProfile?.startDate?.split('T')[0] || '',
        endDate: editingEmployee.crewProfile?.endDate?.split('T')[0] || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'driver',
        phoneNumber: '',
        kraPin: '',
        nssfNumber: '',
        nhifNumber: '',
        bankName: '',
        branchName: '',
        accountNumber: '',
        employmentType: 'permanent',
        startDate: '',
        endDate: '',
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let result;
      if (editingEmployee) {
        result = await employeeService.updateEmployee(editingEmployee._id, formData);
      } else {
        result = await employeeService.createEmployee(formData);
      }
      onEmployeeAddedOrUpdated(result);
      clearEditing();
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <div className="form-grid">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password (leave blank to keep unchanged)" />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="driver">Driver</option>
          <option value="conductor">Conductor</option>
          <option value="route_marshal">Route Marshal</option>
          <option value="mechanic">Mechanic</option>
          <option value="admin">Admin</option>
          <option value="clerk">Clerk</option>
        </select>
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        <input name="kraPin" value={formData.kraPin} onChange={handleChange} placeholder="KRA PIN" />
        <input name="nssfNumber" value={formData.nssfNumber} onChange={handleChange} placeholder="NSSF Number" />
        <input name="nhifNumber" value={formData.nhifNumber} onChange={handleChange} placeholder="NHIF Number" />
        <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
        <input name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch Name" />
        <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" />
        <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
          <option value="casual">Casual</option>
        </select>
        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
        <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : (editingEmployee ? 'Update Employee' : 'Add Employee')}
      </button>
      {editingEmployee && <button type="button" onClick={clearEditing}>Cancel</button>}
    </form>
  );
};

export default EmployeeForm;
