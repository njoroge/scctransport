import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import { AuthContext } from '../context/AuthContext'; // To get token if needed, though axios default is set

const VehicleListPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext); // Token might be used if service doesn't rely on global axios config

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError('');
        // Pass token if your service requires it explicitly, otherwise it uses global config
        const data = await vehicleService.getAllVehicles(token);
        setVehicles(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch vehicles.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [token]); // Re-fetch if token changes, though usually it means re-auth

  if (loading) {
    return <p>Loading vehicles...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Vehicle Management</h2>
      <Link to="/vehicles/add">
        <button style={{ marginBottom: '1rem' }}>Add New Vehicle</button>
      </Link>
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Number Plate</th>
              <th>Type</th>
              <th>Nickname</th>
              <th>Capacity</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.numberPlate}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.nickname || '-'}</td>
                <td>{vehicle.passengerCapacity}</td>
                <td>{vehicle.owner ? vehicle.owner.name : 'N/A'}</td>
                <td>{vehicle.status}</td>
                <td>
                  <Link to={`/vehicles/${vehicle._id}`}>View</Link> | {' '}
                  <Link to={`/vehicles/${vehicle._id}/edit`}>Edit</Link> | {' '}
                  <button onClick={() => alert(`Delete ${vehicle._id}? Implement me!`)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleListPage;
