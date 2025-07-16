import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { FaTachometerAlt, FaTruck, FaUsers, FaRoute, FaHeartbeat, FaFileInvoiceDollar, FaUserCheck, FaMapMarkedAlt, FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; // Import sidebar styles

const Sidebar = () => {
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  if (loading) {
    return (
      <div className="sidebar">
        <p className="sidebar-link">Loading...</p>
      </div>
    );
  }

  return (
    <div className="sidebar">
      {isAuthenticated && user && (
        <div className="user-info">
          <h4>{user.name}</h4>
          <small>({user.role})</small>
          {user.idVerification && (
            <small style={{ display: 'block', marginTop: '5px', color: user.idVerification.status === 'verified' ? 'lightgreen' : 'yellow' }}>
              ID Status: {user.idVerification.status.replace('_', ' ')}
            </small>
          )}
        </div>
      )}

      {isAuthenticated ? (
        <>
          <NavLink to="/dashboard" className="sidebar-link" activeClassName="active" exact><FaTachometerAlt className="icon" /> Dashboard</NavLink>
          <NavLink to="/vehicles" className="sidebar-link" activeClassName="active"><FaTruck className="icon" /> Vehicles</NavLink>
          <NavLink to="/crew" className="sidebar-link" activeClassName="active"><FaUsers className="icon" /> Crew</NavLink>
          <NavLink to="/routes" className="sidebar-link" activeClassName="active"><FaRoute className="icon" /> Routes</NavLink>
          <NavLink to="/welfare" className="sidebar-link" activeClassName="active"><FaHeartbeat className="icon" /> Welfare</NavLink>
          <NavLink to="/payroll" className="sidebar-link" activeClassName="active"><FaFileInvoiceDollar className="icon" /> Payroll</NavLink>
          <NavLink to="/verify-id" className="sidebar-link" activeClassName="active"><FaUserCheck className="icon" /> ID Verification</NavLink>
          <NavLink to="/tracking" className="sidebar-link" activeClassName="active"><FaMapMarkedAlt className="icon" /> Real-time Tracking</NavLink>
          <a href="#!" onClick={handleLogout} className="sidebar-link logout-button"><FaSignOutAlt className="icon" /> Logout</a>
        </>
      ) : (
        <>
          <NavLink to="/" className="sidebar-link" activeClassName="active" exact><FaHome className="icon" /> Home</NavLink>
          <NavLink to="/register" className="sidebar-link" activeClassName="active"><FaUserPlus className="icon" /> Register</NavLink>
          <NavLink to="/login" className="sidebar-link" activeClassName="active"><FaSignInAlt className="icon" /> Login</NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
