import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!user) {
    // This case should ideally be handled by PrivateRoute, but as a fallback:
    return <p>You are not logged in. Please <Link to="/login">login</Link>.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your Role: {user.role}</p>
      {user.memberId && <p>Member ID: {user.memberId}</p>}

      <h2>Quick Links:</h2>
      <ul>
        <li><Link to="/vehicles">Manage Vehicles</Link></li>
        <li><Link to="/crew">Manage Crew</Link></li>
        <li><Link to="/routes">Manage Routes</Link></li>
        {/* Add more links based on user role and features */}
      </ul>

      {/* Placeholder for future dashboard content */}
      {user.role === 'admin' && (
        <div>
          <h3>Admin Section</h3>
          <p>Admin specific tools and reports will appear here.</p>
        </div>
      )}
      {user.role === 'sacco_member' && (
        <div>
          <h3>Member Section</h3>
          <p>Your vehicle details and financial summaries will appear here.</p>
        </div>
      )}
       {user.role === 'driver' && (
        <div>
          <h3>Driver Section</h3>
          <p>Your assigned vehicle, schedule, and deposit records.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
