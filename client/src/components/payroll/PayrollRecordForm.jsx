import React, { useState, useEffect, useContext } from 'react';
import payrollService from '../../services/payrollService.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import EarningsInput from './EarningsInput';
import OtherDeductionsInput from './OtherDeductionsInput';

const PayrollRecordForm = ({ onRecordAddedOrUpdated, editingRecord, clearEditing }) => {
  const initialFormState = {
    crewMember: '',
    payPeriodStartDate: '',
    payPeriodEndDate: '',
    earnings: [{ type: 'basic', amount: '', description: '' }],
    saccoDeductions: {
      shares: '',
      loanRepayment: '',
      memberDeposits: '',
    },
    otherDeductions: [{ type: '', amount: '', description: '' }],
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

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        crewMember: editingRecord.crewMember._id || editingRecord.crewMember,
        payPeriodStartDate: new Date(editingRecord.payPeriodStartDate).toISOString().split('T')[0],
        payPeriodEndDate: new Date(editingRecord.payPeriodEndDate).toISOString().split('T')[0],
        earnings: editingRecord.earnings.length > 0 ? editingRecord.earnings : [{ type: 'basic', amount: '', description: '' }],
        saccoDeductions: editingRecord.saccoDeductions || { shares: '', loanRepayment: '', memberDeposits: '' },
        otherDeductions: editingRecord.otherDeductions.length > 0 ? editingRecord.otherDeductions : [{ type: '', amount: '', description: '' }],
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaccoDeductionChange = (e) => {
    setFormData({
      ...formData,
      saccoDeductions: {
        ...formData.saccoDeductions,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.crewMember || !formData.payPeriodStartDate || !formData.payPeriodEndDate) {
      setError('Crew Member and Pay Period Dates are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const recordData = {
      ...formData,
      earnings: formData.earnings
        .filter(e => e.type && e.amount)
        .map(e => ({ ...e, amount: parseFloat(e.amount) })),
      saccoDeductions: {
        shares: parseFloat(formData.saccoDeductions.shares) || 0,
        loanRepayment: parseFloat(formData.saccoDeductions.loanRepayment) || 0,
        memberDeposits: parseFloat(formData.saccoDeductions.memberDeposits) || 0,
      },
      otherDeductions: formData.otherDeductions
        .filter(d => d.type && d.amount)
        .map(d => ({ ...d, amount: parseFloat(d.amount) })),
      generatedBy: user._id,
    };

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
        setFormData(initialFormState);
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

      <EarningsInput earnings={formData.earnings} setEarnings={(earnings) => setFormData({ ...formData, earnings })} />

      <h4>SACCO Deductions</h4>
      <div>
        <input
          type="number"
          name="shares"
          value={formData.saccoDeductions.shares}
          onChange={handleSaccoDeductionChange}
          placeholder="Shares"
          min="0"
          step="0.01"
        />
        <input
          type="number"
          name="loanRepayment"
          value={formData.saccoDeductions.loanRepayment}
          onChange={handleSaccoDeductionChange}
          placeholder="Loan Repayment"
          min="0"
          step="0.01"
        />
        <input
          type="number"
          name="memberDeposits"
          value={formData.saccoDeductions.memberDeposits}
          onChange={handleSaccoDeductionChange}
          placeholder="Member Deposits"
          min="0"
          step="0.01"
        />
      </div>

      <OtherDeductionsInput otherDeductions={formData.otherDeductions} setOtherDeductions={(otherDeductions) => setFormData({ ...formData, otherDeductions })} />

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

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? (editingRecord ? 'Updating...' : 'Creating...') : (editingRecord ? 'Update Record' : 'Create Record')}
      </button>
      {editingRecord && (
        <button type="button" onClick={clearEditing} className="btn btn-secondary ms-2">
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default PayrollRecordForm;
