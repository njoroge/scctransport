import React, { useEffect, useContext } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'; // Added Redirect
import './App.css';

import Sidebar from './components/Sidebar.jsx'; // Changed from Navbar
import PrivateRoute from './components/PrivateRoute.jsx';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
// Import placeholder pages for main features (to be expanded later)
import VehicleListPage from './pages/VehicleListPage.jsx'; // Placeholder for now
import AddVehiclePage from './pages/AddVehiclePage.jsx';   // Placeholder for now
import CrewListPage from './pages/CrewListPage.jsx';       // Placeholder for now
import AddCrewProfilePage from './pages/AddCrewProfilePage.jsx'; // Placeholder for now
import RouteListPage from './pages/RouteListPage.jsx';     // Placeholder for now
import AddRoutePage from './pages/AddRoutePage.jsx';       // Placeholder for now
import WelfarePage from './pages/WelfarePage.jsx';
import PayrollPage from './pages/PayrollPage.jsx';         // Import PayrollPage
import IDVerificationPage from './pages/IDVerificationPage.jsx'; // Import IDVerificationPage
import RealTimeTrackingPage from './pages/RealTimeTrackingPage.jsx'; // Import RealTimeTrackingPage
import EmployeeManagementPage from './pages/EmployeeManagementPage.jsx';
import PayslipPage from './pages/PayslipPage.jsx';

import { AuthContext } from './context/AuthContext.jsx';


function App() {
  const location = useLocation();
  // const { token, loadUser, isAuthenticated, user } = useContext(AuthContext); // loadUser removed
  const { isAuthenticated, loading } = useContext(AuthContext); // Added loading

  // The useEffect in AuthProvider (dependent on state.token) should now handle
  // loading the user when the token is available or changes.
  // So, the useEffect here that called loadUser is no longer needed.
  // useEffect(() => {
  //   if (token && !isAuthenticated && !user) { // Only load if token exists but user not loaded
  //       loadUser();
  //   }
  // }, [token, loadUser, isAuthenticated, user]);


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
            isAuthenticated && !loading ? <Redirect to="/dashboard" /> : <LoginPage {...props} /> // loading is now available
          } />
          <Route path="/register" render={(props) =>
            isAuthenticated && !loading ? <Redirect to="/dashboard" /> : <RegisterPage {...props} /> // loading is now available
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
          <PrivateRoute exact path="/verify-id" component={IDVerificationPage} />
          <PrivateRoute exact path="/tracking" component={RealTimeTrackingPage} />


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
