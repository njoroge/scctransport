import React, { useState, useEffect, useCallback, useContext } from 'react';
import PayrollRecordForm from '../components/payroll/PayrollRecordForm.jsx';
import PayrollRecordsList from '../components/payroll/PayrollRecordsList.jsx';
import payrollService from '../services/payrollService.js';
import { AuthContext } from '../context/AuthContext.jsx';

const PayrollPage = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchPayrollRecords = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await payrollService.getAllPayrollRecords(); // Add filters later
      setRecords(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch payroll records.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayrollRecords();
  }, [fetchPayrollRecords]);

  const handleRecordAddedOrUpdated = (newOrUpdatedRecord) => {
    if (editingRecord) {
      setRecords(prev =>
        prev.map(r => r._id === newOrUpdatedRecord._id ? newOrUpdatedRecord : r)
      );
    } else {
      setRecords(prev => [newOrUpdatedRecord, ...prev]);
    }
    setEditingRecord(null); // Clear editing state
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    window.scrollTo(0, 0); // Scroll to form
  };

  const clearEditingState = () => {
    setEditingRecord(null);
  };

  // Delete is typically handled by changing status to 'Cancelled' via an update.
  // const handleDelete = async (recordId) => { ... };

  const canManagePayroll = user && (user.role === 'admin' || user.role === 'route_marshal'); // Placeholder for payroll staff role

  return (
    <div>
      <h2>Crew Payroll Management</h2>
      {error && <p className="error-message">Error: {error}</p>}

      {canManagePayroll && (
        <PayrollRecordForm
          onRecordAddedOrUpdated={handleRecordAddedOrUpdated}
          editingRecord={editingRecord}
          clearEditing={clearEditingState}
        />
      )}

      <PayrollRecordsList
        records={records}
        onEdit={canManagePayroll ? handleEdit : null}
        // onDelete={canManagePayroll ? handleDelete : null}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PayrollPage;
