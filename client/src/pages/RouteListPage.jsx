import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import routeService from '../services/routeService';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RouteListPage = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const mapCenter = [-1.286389, 36.817223]; // Nairobi

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await routeService.getAllRoutes();
        setRoutes(data.routes);
      } catch (err) {
        setError('Could not fetch routes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const handleDelete = async (routeId) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await routeService.deleteRoute(routeId);
        setRoutes(routes.filter(route => route._id !== routeId));
      } catch (err) {
        setError('Could not delete route.');
      }
    }
  };

  return (
    <div>
      <h2>Routes</h2>
      <Link to="/add-route">Add New Route</Link>
      {loading && <p>Loading routes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer center={mapCenter} zoom={12} style={{ height: '500px', width: '100%', marginTop: '20px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {routes.map((route) => {
          const positions = [
            [route.origin.latitude, route.origin.longitude],
            ...route.waypoints.map(wp => [wp.latitude, wp.longitude]),
            [route.destination.latitude, route.destination.longitude]
          ];
          return (
            <React.Fragment key={route._id}>
              <Polyline positions={positions} />
              <Marker position={[route.origin.latitude, route.origin.longitude]}>
                <Popup>{route.routeName} - Origin</Popup>
              </Marker>
              <Marker position={[route.destination.latitude, route.destination.longitude]}>
                <Popup>{route.routeName} - Destination</Popup>
              </Marker>
            </React.Fragment>
          )
        })}
      </MapContainer>
      <div style={{ marginTop: '20px' }}>
        <h3>Route List</h3>
        <ul>
          {routes.map(route => (
            <li key={route._id}>
              <strong>{route.routeName}</strong> ({route.routeNumber}) - {route.status}
              <button onClick={() => handleDelete(route._id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RouteListPage;
