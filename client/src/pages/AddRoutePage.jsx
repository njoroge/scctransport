import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import routeService from '../services/routeService';
import { useHistory } from 'react-router-dom';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AddRoutePage = () => {
  const [routeName, setRouteName] = useState('');
  const [routeNumber, setRouteNumber] = useState('');
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [routeType, setRouteType] = useState('Planned');
  const [status, setStatus] = useState('Planned');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const history = useHistory();

  const mapCenter = [-1.286389, 36.817223]; // Nairobi

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const point = { latitude: lat, longitude: lng };
        if (!origin) {
          setOrigin(point);
        } else if (!destination) {
          setDestination(point);
        } else {
          setWaypoints([...waypoints, { ...point, order: waypoints.length + 1 }]);
        }
      },
    });

    const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        showMarker: true,
        showPopup: false,
        marker: {
          icon: new L.Icon.Default(),
          draggable: false,
        },
        autoClose: true,
        keepResult: true,
      });

      useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
      }, []);

    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!routeName || !origin || !destination || !estimatedDistance || !estimatedDuration || !routeType) {
      setError('Please fill in all required fields and select origin/destination on the map.');
      return;
    }

    const routeData = {
      routeName,
      routeNumber,
      origin,
      destination,
      waypoints,
      estimatedDistance,
      estimatedDuration,
      routeType,
      status,
    };

    try {
      await routeService.createRoute(routeData);
      setSuccess('Route created successfully!');
      setTimeout(() => history.push('/routes'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Define New Route</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div style={{ display: 'flex' }}>
        <form onSubmit={handleSubmit} style={{ flex: 1, marginRight: '20px' }}>
          <div>
            <label>Route Name*</label>
            <input type="text" value={routeName} onChange={(e) => setRouteName(e.target.value)} required />
          </div>
          <div>
            <label>Route Number</label>
            <input type="text" value={routeNumber} onChange={(e) => setRouteNumber(e.target.value)} />
          </div>
          <div>
            <label>Estimated Distance (km)*</label>
            <input type="number" value={estimatedDistance} onChange={(e) => setEstimatedDistance(e.target.value)} required />
          </div>
          <div>
            <label>Estimated Duration (minutes)*</label>
            <input type="number" value={estimatedDuration} onChange={(e) => setEstimatedDuration(e.target.value)} required />
          </div>
          <div>
            <label>Route Type*</label>
            <select value={routeType} onChange={(e) => setRouteType(e.target.value)}>
              <option value="Delivery">Delivery</option>
              <option value="Pickup">Pickup</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Planned">Planned</option>
              <option value="Historical">Historical</option>
              <option value="Optimized">Optimized</option>
            </select>
          </div>
          <div>
            <label>Status*</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Planned">Planned</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <button type="submit">Create Route</button>
        </form>
        <div style={{ flex: 2 }}>
            <p>Click on the map to set Origin, then Destination, then any Waypoints.</p>
            <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                {origin && <Marker position={[origin.latitude, origin.longitude]}><Popup>Origin</Popup></Marker>}
                {destination && <Marker position={[destination.latitude, destination.longitude]}><Popup>Destination</Popup></Marker>}
                {waypoints.map((wp, idx) => (
                <Marker key={idx} position={[wp.latitude, wp.longitude]}>
                    <Popup>Waypoint {idx + 1}</Popup>
                </Marker>
                ))}
            </MapContainer>
            <div>
                <p>Origin: {origin ? `${origin.latitude}, ${origin.longitude}` : 'Not set'}</p>
                <p>Destination: {destination ? `${destination.latitude, destination.longitude}` : 'Not set'}</p>
                <p>Waypoints: {waypoints.length}</p>
                <button onClick={() => { setOrigin(null); setDestination(null); setWaypoints([]); }}>Clear Map</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoutePage;
