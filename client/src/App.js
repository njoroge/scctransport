import React, { useEffect, useContext } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar'; // Changed from Navbar
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
// Import placeholder pages for main features (to be expanded later)
import VehicleListPage from './pages/VehicleListPage'; // Placeholder for now
import AddVehiclePage from './pages/AddVehiclePage';   // Placeholder for now
import CrewListPage from './pages/CrewListPage';       // Placeholder for now
import AddCrewProfilePage from './pages/AddCrewProfilePage'; // Placeholder for now
import RouteListPage from './pages/RouteListPage';     // Placeholder for now
import AddRoutePage from './pages/AddRoutePage';       // Placeholder for now
import WelfarePage from './pages/WelfarePage';
import PayrollPage from './pages/PayrollPage';         // Import PayrollPage

import { AuthContext } from './context/AuthContext';


function App() {
  const location = useLocation();
  const { token, loadUser, isAuthenticated, user } = useContext(AuthContext);

  // This effect will run when the token changes (e.g., after login) or on initial app load.
  // It ensures that if a token exists (e.g. from localStorage after a refresh, or just set by login),
  // the user's data is loaded.
  useEffect(() => {
    if (token && !isAuthenticated && !user) { // Only load if token exists but user not loaded
        loadUser();
    }
  }, [token, loadUser, isAuthenticated, user]);


  return (
    <div className="app-container"> {/* New main wrapper */}
      <Sidebar />
      <div className="main-content"> {/* Wrapper for page content */}
        {/* The old "container" class might still be useful inside main-content for centering page content */}
        {/* For now, main-content will just be the area to the right of the sidebar */}
        <Switch>
          {/* Public Routes - these might not show sidebar or have a different layout */}
          {/* For simplicity, sidebar is always shown. Can be refined later. */}
          <Route exact path="/" component={HomePage} />
          {/* Redirect authenticated users away from login/register */}
          <Route path="/login" render={(props) =>
            isAuthenticated && !loading ? <Redirect to="/dashboard" /> : <LoginPage {...props} />
          } />
          <Route path="/register" render={(props) =>
            isAuthenticated && !loading ? <Redirect to="/dashboard" /> : <RegisterPage {...props} />
          } />

          {/* Protected Routes */}
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />

          {/* Placeholders for PSV Management Module Routes - Will be expanded */}
          {/* These will also be PrivateRoutes */}
          <PrivateRoute exact path="/vehicles" component={VehicleListPage} />
          <PrivateRoute exact path="/vehicles/add" component={AddVehiclePage} />
          {/* <PrivateRoute exact path="/vehicles/:id/edit" component={EditVehiclePage} /> */}
          {/* <PrivateRoute exact path="/vehicles/:id" component={VehicleDetailsPage} /> */}

          <PrivateRoute exact path="/crew" component={CrewListPage} />
          <PrivateRoute exact path="/crew/add" component={AddCrewProfilePage} />
          {/* <PrivateRoute exact path="/crew/:userId/edit" component={EditCrewProfilePage} /> */}

          <PrivateRoute exact path="/routes" component={RouteListPage} />
          <PrivateRoute exact path="/routes/add" component={AddRoutePage} />
          {/* <PrivateRoute exact path="/routes/:idOrName/edit" component={EditRoutePage} /> */}

          <PrivateRoute exact path="/welfare" component={WelfarePage} />
          <PrivateRoute exact path="/payroll" component={PayrollPage} />


          {/* TODO: Add a 404 Not Found Page component */}
          <Route path="*">
            <div>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          </Route>
        </Switch>
      </div> {/* End of main-content */}
    </div> /* End of app-container */
  );
}

export default App;
