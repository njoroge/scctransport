require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route files
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const crewProfileRoutes = require('./routes/crewProfileRoutes');
const routeDefinitionRoutes = require('./routes/routeDefinitionRoutes');
const welfareRoutes = require('./routes/welfareRoutes');
const payrollRoutes = require('./routes/payrollRoutes'); // Import payroll routes
const verificationRoutes = require('./routes/verificationRoutes'); // Import verification routes
const gpsDataRoutes = require('./routes/gpsDataRoutes'); // Import GPS data routes
const employeeRoutes = require('./routes/employeeRoutes'); // Import employee routes

// Import error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Basic Route for initial check
app.get('/', (req, res) => {
  res.send('PSV Management API Running');
});

// Mount Routers
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/crew-profiles', crewProfileRoutes);
app.use('/api/routes', routeDefinitionRoutes);
app.use('/api/welfare', welfareRoutes);
app.use('/api/payroll', payrollRoutes); // Mount payroll routes
app.use('/api/verification', verificationRoutes); // Mount verification routes
app.use('/api/gps-data', gpsDataRoutes); // Mount GPS data routes
app.use('/api/employees', employeeRoutes);


// Error Handling Middleware (should be last in the middleware stack)
app.use(notFound); // Handle 404 errors for routes not found
app.use(errorHandler); // Handle general errors

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
