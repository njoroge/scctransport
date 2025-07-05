import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom'; // Changed Link to NavLink
import { AuthContext } from '../context/AuthContext.jsx';

const Sidebar = () => {
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login'); // Redirect to login page after logout
  };

  // Basic styling for the sidebar and links
  // These will be complemented by styles in a CSS file (e.g., App.css or Sidebar.css)
  const sidebarStyle = {
    height: '100vh', // Full height
    width: '220px', // Sidebar width
    position: 'fixed', // Fixed sidebar
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#2c3e50', // Dark blue/grey
    paddingTop: '20px',
    overflowX: 'hidden', // Hide horizontal scrollbar
  };

  const linkStyle = {
    padding: '10px 15px',
    textDecoration: 'none',
    fontSize: '1.1em',
    color: '#bdc3c7', // Light grey text
    display: 'block',
    transition: '0.3s',
  };

  const activeLinkStyle = { // Example for active link, react-router's NavLink is better for this
    ...linkStyle,
    color: '#ffffff', // White text for active
    backgroundColor: '#34495e' // Slightly darker background for active
  };

  const userInfoStyle = {
    padding: '10px 15px',
    color: '#ecf0f1', // Lighter text for user info
    borderBottom: '1px solid #34495e', // Separator
    marginBottom: '10px',
  };

  const logoutButtonStyle = { // Making logout look more like a button within the sidebar
    ...linkStyle,
    cursor: 'pointer',
    backgroundColor: '#c0392b', // Reddish for logout
    color: '#ffffff',
    textAlign: 'center',
    margin: '20px 15px 0 15px',
    borderRadius: '5px',
  };


  if (loading) {
    return (
      <div style={sidebarStyle}>
        <p style={linkStyle}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={sidebarStyle}>
      {isAuthenticated && user && (
        <div style={userInfoStyle}>
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
          <NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle} exact>Dashboard</NavLink>
          <NavLink to="/vehicles" style={linkStyle} activeStyle={activeLinkStyle}>Vehicles</NavLink>
          <NavLink to="/crew" style={linkStyle} activeStyle={activeLinkStyle}>Crew</NavLink>
          <NavLink to="/routes" style={linkStyle} activeStyle={activeLinkStyle}>Routes</NavLink>
          <NavLink to="/welfare" style={linkStyle} activeStyle={activeLinkStyle}>Welfare</NavLink>
          <NavLink to="/payroll" style={linkStyle} activeStyle={activeLinkStyle}>Payroll</NavLink>
          <NavLink to="/verify-id" style={linkStyle} activeStyle={activeLinkStyle}>ID Verification</NavLink> {/* Added ID Verification Link */}
          {/* Add more links based on user role if needed */}
          {/* Example: user.role === 'admin' && <NavLink to="/admin/users" style={linkStyle} activeStyle={activeLinkStyle}>Manage Users</NavLink> */}
          <a href="#!" onClick={handleLogout} style={logoutButtonStyle}>Logout</a>
        </>
      ) : (
        <>
          <NavLink to="/" style={linkStyle} activeStyle={activeLinkStyle} exact>Home</NavLink>
          <NavLink to="/register" style={linkStyle} activeStyle={activeLinkStyle}>Register</NavLink>
          <NavLink to="/login" style={linkStyle} activeStyle={activeLinkStyle}>Login</NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
