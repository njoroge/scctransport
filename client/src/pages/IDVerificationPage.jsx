import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { submitIdForVerification, fetchVerificationStatus } from '../services/verificationService.js';
// import { useHistory } from 'react-router-dom';


const IDVerificationPage = () => {
  const { token } = useContext(AuthContext); // token from AuthContext will be used by service
  // const history = useHistory();

  const [formData, setFormData] = useState({
    nationalIdNumber: '',
    fullNameOnId: '',
    dobOnId: '', // Should be YYYY-MM-DD for input type="date"
  });

  const [verificationStatus, setVerificationStatus] = useState(null); // Stores the full status object from backend
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(''); // For success/error messages from form submission
  const [statusLoading, setStatusLoading] = useState(true); // For loading initial status

  const { nationalIdNumber, fullNameOnId, dobOnId } = formData;

  // Fetch current verification status on component mount
  useEffect(() => {
    const getStatus = async () => {
      if (!token) {
        setStatusLoading(false);
        setMessage('Not authenticated. Cannot fetch verification status.'); // Should not happen if page is protected
        return;
      }
      setStatusLoading(true);
      const response = await fetchVerificationStatus(); // Service uses token from localStorage
      if (response.success) {
        setVerificationStatus(response.data);
        if(response.data.status !== 'not_verified' && response.data.status !== 'failed') {
          // If already pending or verified, prefill form (optional, or just show status)
          // For now, just showing status.
        }
      } else {
        setMessage(response.message || 'Could not fetch verification status.');
      }
      setStatusLoading(false);
    };
    getStatus();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nationalIdNumber || !fullNameOnId || !dobOnId) {
      setMessage('All fields are required.');
      return;
    }
    setIsLoading(true);
    setMessage('');

    const response = await submitIdForVerification({ nationalIdNumber, fullNameOnId, dobOnId });

    if (response.success) {
      // Backend returns: { message, idVerificationStatus, details }
      // The 'details' object from backend should be the updated idVerification sub-document
      setMessage(response.message || 'ID details submitted successfully.');
      if (response.details) {
        setVerificationStatus(response.details);
      } else if (response.idVerificationStatus) {
        // Fallback if details isn't the full object, try to update status at least
        setVerificationStatus(prevStatus => ({ ...prevStatus, status: response.idVerificationStatus, remarks: response.message }));
      }
    } else {
      setMessage(response.message || 'An error occurred during submission.');
      if (response.details) { // If backend returns details even on failure
        setVerificationStatus(response.details);
      }
    }
    setIsLoading(false);
  };

  const renderStatusDetails = () => {
    if (!verificationStatus) return <p>Loading verification status...</p>;

    let statusText = 'Unknown';
    let statusColor = 'grey';

    switch (verificationStatus.status) {
      case 'not_verified':
        statusText = 'Not Verified';
        statusColor = 'orange';
        break;
      case 'pending':
        statusText = 'Pending Verification';
        statusColor = 'blue';
        break;
      case 'verified':
        statusText = 'Verified';
        statusColor = 'green';
        break;
      case 'failed':
        statusText = 'Verification Failed';
        statusColor = 'red';
        break;
      case 'needs_review':
        statusText = 'Needs Manual Review';
        statusColor = 'purple';
        break;
      default:
        statusText = verificationStatus.status;
    }

    return (
      <div style={{ marginBottom: '20px', padding: '10px', border: `1px solid ${statusColor}` }}>
        <h4>Current Verification Status: <span style={{ color: statusColor }}>{statusText}</span></h4>
        {verificationStatus.remarks && <p><strong>Remarks:</strong> {verificationStatus.remarks}</p>}
        {verificationStatus.lastAttemptAt && <p>Last Attempt: {new Date(verificationStatus.lastAttemptAt).toLocaleString()}</p>}
        {verificationStatus.verifiedAt && <p>Verified At: {new Date(verificationStatus.verifiedAt).toLocaleString()}</p>}
      </div>
    );
  };


  if (statusLoading) {
    return <p>Loading ID Verification Information...</p>;
  }

  // Do not show form if user is already verified.
  if (verificationStatus && verificationStatus.status === 'verified') {
    return (
      <div>
        <h2>ID Verification</h2>
        {renderStatusDetails()}
        <p>Your ID has been successfully verified. No further action is needed.</p>
      </div>
    );
  }

  // Do not show form if status is 'pending' or 'needs_review', just show status.
  if (verificationStatus && (verificationStatus.status === 'pending' || verificationStatus.status === 'needs_review')) {
     return (
      <div>
        <h2>ID Verification</h2>
        {renderStatusDetails()}
        <p>Your ID verification is currently being processed or requires review. Please check back later.</p>
      </div>
    );
  }


  return (
    <div>
      <h2>National ID Verification</h2>
      {verificationStatus && renderStatusDetails()}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nationalIdNumber">National ID Number:</label>
          <input
            type="text"
            id="nationalIdNumber"
            name="nationalIdNumber"
            value={nationalIdNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="fullNameOnId">Full Name (as on ID):</label>
          <input
            type="text"
            id="fullNameOnId"
            name="fullNameOnId"
            value={fullNameOnId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dobOnId">Date of Birth (on ID):</label>
          <input
            type="date"
            id="dobOnId"
            name="dobOnId"
            value={dobOnId}
            onChange={handleChange}
            required
          />
        </div>
        {message && <p style={{ color: message.startsWith('ID details submitted successfully') || message.startsWith('Verification successful') ? 'green' : 'red' }}>{message}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
};

export default IDVerificationPage;
