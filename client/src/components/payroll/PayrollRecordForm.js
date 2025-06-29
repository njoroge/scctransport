import React, { useState, useEffect, useContext } from 'react';
import payrollService from '../../services/payrollService';
import { AuthContext } from '../../context/AuthContext';
// import userService from '../../services/userService'; // To fetch crew members

const PayrollRecordForm = ({ onRecordAddedOrUpdated, editingRecord, clearEditing }) => {
  const initialDeductionState = { type: '', description: '', amount: '' };
  const initialFormState = {
    crewMember: '', // User ID of the crew member
    payPeriodStartDate: '',
    payPeriodEndDate: '',
    grossPay: '',
    deductions: [initialDeductionState],
    paymentMethod: 'Bank Transfer',
    referenceNumber: '',
    status: 'Pending',
    notes: '',
    basisOfPayment: 'Fixed Rate',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const [crewMembers, setCrewMembers] = useState([]); // For dropdown later

  const { user } = useContext(AuthContext); // For 'generatedBy'

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        crewMember: editingRecord.crewMember._id || editingRecord.crewMember,
        payPeriodStartDate: new Date(editingRecord.payPeriodStartDate).toISOString().split('T')[0],
        payPeriodEndDate: new Date(editingRecord.payPeriodEndDate).toISOString().split('T')[0],
        grossPay: editingRecord.grossPay,
        deductions: editingRecord.deductions && editingRecord.deductions.length > 0 ? editingRecord.deductions : [initialDeductionState],
        paymentMethod: editingRecord.paymentMethod,
        referenceNumber: editingRecord.referenceNumber || '',
        status: editingRecord.status,
        notes: editingRecord.notes || '',
        basisOfPayment: editingRecord.basisOfPayment,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingRecord]);

  // Fetch crew members for dropdown - Placeholder
  // useEffect(() => { /* fetch crew members */ }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeductionChange = (index, e) => {
    const updatedDeductions = formData.deductions.map((deduction, i) =>
      index === i ? { ...deduction, [e.target.name]: e.target.value } : deduction
    );
    setFormData({ ...formData, deductions: updatedDeductions });
  };

  const addDeduction = () => {
    setFormData({
      ...formData,
      deductions: [...formData.deductions, { ...initialDeductionState }],
    });
  };

  const removeDeduction = (index) => {
    const filteredDeductions = formData.deductions.filter((_, i) => i !== index);
    setFormData({ ...formData, deductions: filteredDeductions.length > 0 ? filteredDeductions : [initialDeductionState] });
  };

  const calculateNetPay = () => {
    const gross = parseFloat(formData.grossPay) || 0;
    const totalDeductions = formData.deductions.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    return (gross - totalDeductions).toFixed(2);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.crewMember || !formData.payPeriodStartDate || !formData.payPeriodEndDate || !formData.grossPay) {
      setError('Crew Member, Pay Period Dates, and Gross Pay are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const recordData = {
      ...formData,
      grossPay: parseFloat(formData.grossPay),
      deductions: formData.deductions
        .filter(d => d.type && d.amount) // Only include deductions with type and amount
        .map(d => ({ ...d, amount: parseFloat(d.amount) })),
      generatedBy: user._id,
    };
    // Net pay and deductionsTotal will be calculated by backend pre-save hook

    try {
      let savedRecord;
      if (editingRecord) {
        savedRecord = await payrollService.updatePayrollRecord(editingRecord._id, recordData);
        setSuccessMessage('Payroll record updated successfully!');
      } else {
        savedRecord = await payrollService.createPayrollRecord(recordData);
        setSuccessMessage('Payroll record created successfully!');
      }

      if (onRecordAddedOrUpdated) {
        onRecordAddedOrUpdated(savedRecord);
      }

      if (!editingRecord) {
        setFormData(initialFormState); // Reset form
      } else if (clearEditing) {
        clearEditing();
      }

    } catch (err) {
      setError(err.message || 'Failed to save payroll record.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee' }}>
      <h3>{editingRecord ? 'Edit Payroll Record' : 'Create New Payroll Record'}</h3>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div>
        <label htmlFor="crewMember">Crew Member User ID:</label>
        <input type="text" name="crewMember" value={formData.crewMember} onChange={handleChange} placeholder="Enter User ID of Crew Member" required />
      </div>
      <div>
        <label htmlFor="payPeriodStartDate">Pay Period Start Date:</label>
        <input type="date" name="payPeriodStartDate" value={formData.payPeriodStartDate} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="payPeriodEndDate">Pay Period End Date:</label>
        <input type="date" name="payPeriodEndDate" value={formData.payPeriodEndDate} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="basisOfPayment">Basis of Payment:</label>
        <select name="basisOfPayment" value={formData.basisOfPayment} onChange={handleChange}>
            <option value="Fixed Rate">Fixed Rate</option>
            <option value="Commission">Commission</option>
            <option value="Hourly">Hourly</option>
            <option value="Daily Rate">Daily Rate</option>
            <option value="Trip Rate">Trip Rate</option>
            <option value="Mixed">Mixed</option>
            <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="grossPay">Gross Pay:</label>
        <input type="number" name="grossPay" value={formData.grossPay} onChange={handleChange} required min="0" step="0.01" />
      </div>

      <h4>Deductions</h4>
      {formData.deductions.map((deduction, index) => (
        <div key={index} style={{ border: '1px dashed #ccc', padding: '10px', marginBottom: '10px' }}>
          <label htmlFor={`deductionType-${index}`}>Deduction Type:</label>
          <input type="text" name="type" id={`deductionType-${index}`} value={deduction.type} onChange={(e) => handleDeductionChange(index, e)} placeholder="e.g., NSSF, Loan" />

          <label htmlFor={`deductionDesc-${index}`}>Description (Optional):</label>
          <input type="text" name="description" id={`deductionDesc-${index}`} value={deduction.description} onChange={(e) => handleDeductionChange(index, e)} />

          <label htmlFor={`deductionAmount-${index}`}>Amount:</label>
          <input type="number" name="amount" id={`deductionAmount-${index}`} value={deduction.amount} onChange={(e) => handleDeductionChange(index, e)} min="0" step="0.01" />

          {formData.deductions.length > 1 && (
            <button type="button" onClick={() => removeDeduction(index)} style={{backgroundColor: '#d9534f', marginTop: '5px'}}>Remove Deduction</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addDeduction} style={{backgroundColor: '#5bc0de', marginBottom: '10px'}}>Add Deduction</button>

      <div>
          <p><strong>Calculated Net Pay: {calculateNetPay()}</strong></p>
      </div>

      <div>
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cash">Cash</option>
          <option value="Mobile Money">Mobile Money</option>
          <option value="Cheque">Cheque</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="referenceNumber">Payment Reference (Optional):</label>
        <input type="text" name="referenceNumber" value={formData.referenceNumber} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes">Notes (Optional):</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"></textarea>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (editingRecord ? 'Updating...' : 'Creating...') : (editingRecord ? 'Update Record' : 'Create Record')}
      </button>
      {editingRecord && (
          <button type="button" onClick={clearEditing} style={{marginLeft: '10px', backgroundColor: '#aaa'}}>
              Cancel Edit
          </button>
      )}
    </form>
  );
};

export default PayrollRecordForm;
