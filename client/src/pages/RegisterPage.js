import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'sacco_member', // Default role
    memberId: '',
    phoneNumber: '',
  });
  const { register, error, loading, clearErrors } = useContext(AuthContext);
  const history = useHistory();
  const [pageError, setPageError] = useState('');


  const { name, email, password, confirmPassword, role, memberId, phoneNumber } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors(); // Clear context errors
    setPageError(''); // Clear page-specific errors

    if (password !== confirmPassword) {
      setPageError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
        setPageError('Password must be at least 6 characters');
        return;
    }

    const registrationData = { name, email, password, role, memberId, phoneNumber };

    // Remove memberId if not relevant for the role (e.g. admin)
    if (role !== 'sacco_member') {
        delete registrationData.memberId;
    } else if (!memberId) {
        setPageError('Member ID is required for SACCO Members.');
        return;
    }


    const result = await register(registrationData);
    if (result && result.success) {
      // Handle successful registration, e.g., redirect to login or show success message
      history.push('/login?registration=success'); // Redirect to login with a success query param
    } else if (result && result.error) {
        setPageError(result.error); // Display error from registration attempt
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={role} onChange={handleChange}>
            <option value="sacco_member">SACCO Member</option>
            <option value="driver">Driver</option>
            <option value="conductor">Conductor</option>
            <option value="admin">Admin</option>
            <option value="route_marshal">Route Marshal</option>
            <option value="mechanic">Mechanic</option>
          </select>
        </div>
        {role === 'sacco_member' && (
          <div>
            <label htmlFor="memberId">Member ID:</label>
            <input
              type="text"
              id="memberId"
              name="memberId"
              value={memberId}
              onChange={handleChange}
              // required={role === 'sacco_member'} // Handled in submit
            />
          </div>
        )}
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
        </div>
        {(pageError || error) && <p style={{ color: 'red' }}>{pageError || error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
