import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          // You can return a spinner or loading component here
          return <p>Loading authentication state...</p>;
        }
        if (!isAuthenticated) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

// Example for role-based private route (can be a separate component or integrated)
export const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <p>Loading authentication state...</p>;
        }
        if (!isAuthenticated) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
        if (user && user.role !== 'admin') {
          // Redirect to a 'not authorized' page or dashboard
          return <Redirect to="/dashboard" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};


export default PrivateRoute;
