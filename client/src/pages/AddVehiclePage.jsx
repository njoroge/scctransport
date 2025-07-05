import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import { AuthContext } from '../context/AuthContext';

const AddVehiclePage = () => {
  const [formData, setFormData] = useState({
    numberPlate: '',
    vehicleType: 'Minibus', // Default value
    logbookNumber: '',
    passengerCapacity: '',
    owner: '', // Will be UserId of Sacco Member
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token, user } = useContext(AuthContext); // Assuming user object has role for authorization checks if needed
  const history = useHistory();

  const { numberPlate, vehicleType, logbookNumber, passengerCapacity, owner } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        setError("You must be logged in to add a vehicle.");
        return;
    }
    // Basic validation
    if (!numberPlate || !vehicleType || !logbookNumber || !passengerCapacity || !owner) {
      setError('Please fill in all required fields: Number Plate, Type, Logbook, Capacity, Owner ID.');
      return;
    }

    const vehicleData = {
        ...formData,
        passengerCapacity: parseInt(passengerCapacity),
        // createdBy will be set by backend using token
    };

    setLoading(true);
    setError('');
    try {
      await vehicleService.createVehicle(vehicleData, token);
      history.push('/vehicles'); // Redirect to vehicle list on success
    } catch (err) {
      setError(err.message || 'Failed to create vehicle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numberPlate">Number Plate:</label>
          <input
            type="text"
            id="numberPlate"
            name="numberPlate"
            value={numberPlate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <select name="vehicleType" value={vehicleType} onChange={handleChange} required>
            <option value="Bus">Bus</option>
            <option value="Minibus">Minibus</option>
            <option value="Van">Van</option>
            <option value="Shuttle">Shuttle</option>
            <option value="Coach">Coach</option>
          </select>
        </div>
        <div>
          <label htmlFor="logbookNumber">Logbook Number:</label>
          <input
            type="text"
            id="logbookNumber"
            name="logbookNumber"
            value={logbookNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="passengerCapacity">Passenger Capacity:</label>
          <input
            type="number"
            id="passengerCapacity"
            name="passengerCapacity"
            value={passengerCapacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label htmlFor="owner">Owner User ID (Sacco Member):</label>
          <input
            type="text" // Later, this should be a dropdown select of Sacco Members
            id="owner"
            name="owner"
            value={owner}
            onChange={handleChange}
            required
            placeholder="Enter User ID of the owner"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Adding Vehicle...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default AddVehiclePage;
