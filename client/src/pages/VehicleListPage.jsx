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
        <button className="btn btn-success mb-3">Add New Vehicle</button>
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
                  <Link to={`/vehicles/${vehicle._id}`} className="btn btn-success btn-sm me-1">View</Link>
                  <Link to={`/vehicles/${vehicle._id}/edit`} className="btn btn-success btn-sm me-1">Edit</Link>
                  <button onClick={() => alert(`Delete ${vehicle._id}? Implement me!`)} className="btn btn-danger btn-sm">Delete</button>
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
