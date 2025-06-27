import React from 'react';
import { Link } from 'react-router-dom';

const RouteListPage = () => {
  return (
    <div>
      <h2>Route Definitions</h2>
      <Link to="/routes/add">
        <button>Define New Route</button>
      </Link>
      <p>List of defined routes will appear here...</p>
      {/* Placeholder for routes table/list */}
    </div>
  );
};

export default RouteListPage;
