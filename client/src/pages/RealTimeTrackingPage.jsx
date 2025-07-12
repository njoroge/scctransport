import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// You might need to import the gpsService to fetch data
// import { getLatestGpsData } from '../services/gpsService';

const RealTimeTrackingPage = () => {
  const [vehicles, setVehicles] = useState([]); // To hold vehicle GPS data
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mapCenter, setMapCenter] = useState([-1.286389, 36.817223]); // Default to Nairobi

  // Dummy data for now
  useEffect(() => {
    // In the future, this will be replaced by a call to the gpsService
    const dummyVehicles = [
      { id: 1, name: 'Vehicle A', position: [-1.286389, 36.817223] },
      { id: 2, name: 'Vehicle B', position: [-1.292066, 36.821945] },
    ];
    setVehicles(dummyVehicles);
  }, []);

  return (
    <div>
      <h2>Real-Time Vehicle Tracking</h2>
      <div>
        <label htmlFor="vehicle-select">Select a vehicle:</label>
        <select id="vehicle-select" onChange={(e) => setSelectedVehicle(e.target.value)}>
          <option value="">--All Vehicles--</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>
      <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {vehicles.map(vehicle => (
          <Marker key={vehicle.id} position={vehicle.position}>
            <Popup>
              {vehicle.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RealTimeTrackingPage;
