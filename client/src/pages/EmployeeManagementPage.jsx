import React, { useState, useEffect, useCallback, useContext } from 'react';
import EmployeeList from '../components/employees/EmployeeList';
import EmployeeForm from '../components/employees/EmployeeForm';
import employeeService from '../services/employeeService';
import { AuthContext } from '../context/AuthContext';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch employees.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleEmployeeAddedOrUpdated = (newOrUpdatedEmployee) => {
    if (editingEmployee) {
      setEmployees(prev =>
        prev.map(e => (e._id === newOrUpdatedEmployee._id ? newOrUpdatedEmployee : e))
      );
    } else {
      setEmployees(prev => [newOrUpdatedEmployee, ...prev]);
    }
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    window.scrollTo(0, 0);
  };

  const clearEditingState = () => {
    setEditingEmployee(null);
  };

  const canManageEmployees = user && (user.role === 'admin' || user.role === 'route_marshal');

  return (
    <div>
      <h2>Employee Management</h2>
      {error && <p className="error-message">Error: {error}</p>}

      {canManageEmployees && (
        <EmployeeForm
          onEmployeeAddedOrUpdated={handleEmployeeAddedOrUpdated}
          editingEmployee={editingEmployee}
          clearEditing={clearEditingState}
        />
      )}

      <EmployeeList
        employees={employees}
        onEdit={canManageEmployees ? handleEdit : null}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmployeeManagementPage;
