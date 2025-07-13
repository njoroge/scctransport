import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import gpsService from '../services/gpsService';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RealTimeTrackingPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');
  const mapRef = useRef();

  const mapCenter = [-1.286389, 36.817223]; // Nairobi

  useEffect(() => {
    const fetchGpsData = async () => {
      try {
        const data = await gpsService.getLatestGpsData();
        setVehicles(data);
      } catch (err) {
        setError('Could not fetch GPS data.');
      }
    };

    fetchGpsData();
    const interval = setInterval(fetchGpsData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Real-Time Vehicle Tracking</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {vehicles.map((vehicle) => (
          <Marker key={vehicle.vehicleId} position={[vehicle.latitude, vehicle.longitude]}>
            <Popup>
              Vehicle ID: {vehicle.vehicleId}<br />
              Speed: {vehicle.speed} km/h<br />
              Last Updated: {new Date(vehicle.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RealTimeTrackingPage;
