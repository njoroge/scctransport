import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import crewService from '../services/crewService';
import { AuthContext } from '../context/AuthContext';

const AddCrewProfilePage = () => {
  const [formData, setFormData] = useState({
    user: '',
    psvLicenseNumber: '',
    psvLicenseExpiry: '',
    nationalId: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    employmentDate: '',
    photoUrl: '',
    remarks: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const {
    user,
    psvLicenseNumber,
    psvLicenseExpiry,
    nationalId,
    phoneNumber,
    dateOfBirth,
    address,
    nextOfKinName,
    nextOfKinPhone,
    employmentDate,
    photoUrl,
    remarks,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !psvLicenseNumber || !psvLicenseExpiry || !nationalId || !phoneNumber) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await crewService.createCrewProfile(formData, token);
      history.push('/crew'); // Redirect to crew list on success
    } catch (err) {
      setError(err.message || 'Failed to create crew profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Crew Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User ID:</label>
          <input type="text" id="user" name="user" value={user} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="psvLicenseNumber">PSV License Number:</label>
          <input type="text" id="psvLicenseNumber" name="psvLicenseNumber" value={psvLicenseNumber} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="psvLicenseExpiry">PSV License Expiry:</label>
          <input type="date" id="psvLicenseExpiry" name="psvLicenseExpiry" value={psvLicenseExpiry} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="nationalId">National ID:</label>
          <input type="text" id="nationalId" name="nationalId" value={nationalId} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={address} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="nextOfKinName">Next of Kin Name:</label>
          <input type="text" id="nextOfKinName" name="nextOfKinName" value={nextOfKinName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="nextOfKinPhone">Next of Kin Phone:</label>
          <input type="text" id="nextOfKinPhone" name="nextOfKinPhone" value={nextOfKinPhone} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="employmentDate">Employment Date:</label>
          <input type="date" id="employmentDate" name="employmentDate" value={employmentDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="photoUrl">Photo URL:</label>
          <input type="text" id="photoUrl" name="photoUrl" value={photoUrl} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="remarks">Remarks:</label>
          <textarea id="remarks" name="remarks" value={remarks} onChange={handleChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Adding Profile...' : 'Add Profile'}
        </button>
      </form>
    </div>
  );
};

export default AddCrewProfilePage;
