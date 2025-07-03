import React, { useState, useEffect, useContext } from 'react';
import welfareService from '../../services/welfareService.js';
import { AuthContext } from '../../context/AuthContext.jsx';
// import userService from '../../services/userService'; // To fetch Sacco members for dropdown

const WelfareContributionForm = ({ onContributionAdded, editingContribution, clearEditing }) => {
  const [formData, setFormData] = useState({
    member: '', // User ID of the Sacco member
    contributionDate: new Date().toISOString().split('T')[0], // Default to today
    amount: '',
    contributionType: 'Standard Monthly',
    paymentMethod: 'Cash',
    referenceNumber: '',
    remarks: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const [saccoMembers, setSaccoMembers] = useState([]); // For dropdown later

  const { user } = useContext(AuthContext); // For 'recordedBy'

  useEffect(() => {
    if (editingContribution) {
      setFormData({
        member: editingContribution.member._id || editingContribution.member, // member can be populated or just ID
        contributionDate: new Date(editingContribution.contributionDate).toISOString().split('T')[0],
        amount: editingContribution.amount,
        contributionType: editingContribution.contributionType,
        paymentMethod: editingContribution.paymentMethod,
        referenceNumber: editingContribution.referenceNumber || '',
        remarks: editingContribution.remarks || '',
      });
    } else {
      // Reset form for new entry
      setFormData({
        member: '',
        contributionDate: new Date().toISOString().split('T')[0],
        amount: '',
        contributionType: 'Standard Monthly',
        paymentMethod: 'Cash',
        referenceNumber: '',
        remarks: '',
      });
    }
  }, [editingContribution]);

  // Fetch Sacco members for dropdown - Placeholder for future enhancement
  // useEffect(() => {
  //   const fetchMembers = async () => {
  //     try {
  //       // Assuming userService.getSaccoMembers() exists and returns users with 'sacco_member' role
  //       const members = await userService.getSaccoMembers();
  //       setSaccoMembers(members);
  //     } catch (err) {
  //       console.error("Failed to fetch Sacco members:", err);
  //     }
  //   };
  //   fetchMembers();
  // }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.member || !formData.amount || !formData.contributionDate) {
      setError('Member, Amount, and Date are required.');
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
        setError('Amount must be greater than zero.');
        return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const contributionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      recordedBy: user._id, // Assuming logged-in user is recording
    };

    try {
      let savedContribution;
      if (editingContribution) {
        savedContribution = await welfareService.updateContribution(editingContribution._id, contributionData);
        setSuccessMessage('Contribution updated successfully!');
      } else {
        savedContribution = await welfareService.recordContribution(contributionData);
        setSuccessMessage('Contribution recorded successfully!');
      }

      if (onContributionAdded) {
        onContributionAdded(savedContribution); // Callback to update parent list
      }

      if (!editingContribution) { // Reset form only if it was a new entry
        setFormData({
          member: '',
          contributionDate: new Date().toISOString().split('T')[0],
          amount: '',
          contributionType: 'Standard Monthly',
          paymentMethod: 'Cash',
          referenceNumber: '',
          remarks: '',
        });
      } else if (clearEditing) {
          clearEditing(); // Clear editing state in parent
      }

    } catch (err) {
      setError(err.message || 'Failed to save contribution.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3s
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee' }}>
      <h3>{editingContribution ? 'Edit Contribution' : 'Record New Welfare Contribution'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div>
        <label htmlFor="member">Member User ID:</label>
        {/* Replace with a select dropdown later */}
        <input
          type="text"
          name="member"
          id="member"
          value={formData.member}
          onChange={handleChange}
          placeholder="Enter User ID of SACCO Member"
          required
        />
        {/* <select name="member" value={formData.member} onChange={handleChange} required>
            <option value="">-- Select Member --</option>
            {saccoMembers.map(mem => (
                <option key={mem._id} value={mem._id}>{mem.name} ({mem.memberId})</option>
            ))}
        </select> */}
      </div>

      <div>
        <label htmlFor="contributionDate">Contribution Date:</label>
        <input
          type="date"
          name="contributionDate"
          id="contributionDate"
          value={formData.contributionDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="contributionType">Contribution Type:</label>
        <select name="contributionType" id="contributionType" value={formData.contributionType} onChange={handleChange} required>
          <option value="Standard Monthly">Standard Monthly</option>
          <option value="Benevolent Fund">Benevolent Fund</option>
          <option value="Emergency Support">Emergency Support</option>
          <option value="Shares Purchase">Shares Purchase</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select name="paymentMethod" id="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Mobile Money">Mobile Money</option>
          <option value="Payroll Deduction">Payroll Deduction</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="referenceNumber">Reference Number (Optional):</label>
        <input
          type="text"
          name="referenceNumber"
          id="referenceNumber"
          value={formData.referenceNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="remarks">Remarks (Optional):</label>
        <textarea
          name="remarks"
          id="remarks"
          value={formData.remarks}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (editingContribution ? 'Updating...' : 'Recording...') : (editingContribution ? 'Update Contribution' : 'Record Contribution')}
      </button>
      {editingContribution && (
          <button type="button" onClick={clearEditing} style={{marginLeft: '10px', backgroundColor: '#aaa'}}>
              Cancel Edit
          </button>
      )}
    </form>
  );
};

export default WelfareContributionForm;
