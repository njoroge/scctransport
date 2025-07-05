import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // role: 'sacco_member', // Default role will be set by backend
    memberId: '', // Keep for SACCO members, conditionally shown or handled
    phoneNumber: '',
  });
  const { register, error, loading, clearErrors } = useContext(AuthContext);
  const history = useHistory();
  const [pageError, setPageError] = useState('');


  const { name, email, password, confirmPassword, memberId, phoneNumber } = formData; // Removed role

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

    // Role is no longer selected on the client-side.
    // The backend will assign a default role (e.g., 'sacco_member').
    // If 'sacco_member' is the default, memberId might still be relevant.
    // For now, we assume 'sacco_member' is the default and thus memberId is relevant.
    // This logic might need refinement based on how default role assignment affects required fields.
    const registrationData = { name, email, password, memberId, phoneNumber };

    // If your backend default role is 'sacco_member', you might still want this check,
    // or handle it on the backend. For now, let's assume if memberId is provided, it's for a sacco_member.
    // If memberId is empty, and backend default is sacco_member, backend should ideally handle this.
    // To simplify, let's assume memberId is optional for now from the client,
    // and backend makes it mandatory if the default role is 'sacco_member'.
    // OR, we assume the default role is NOT 'sacco_member' or does not require memberId.
    // Given the previous logic, the default in backend is 'sacco_member'
    // So, if user intends to be a sacco_member, they should provide it.
    // Let's keep the memberId field and its validation if it's provided.
    // The simplest approach for now: send memberId if provided. Backend handles validation based on assigned role.

    if (registrationData.memberId && registrationData.memberId.trim() === '') {
        // If user interacted with memberId field but left it blank, treat as not provided.
        delete registrationData.memberId;
    }
    // If the default role set by the backend is 'sacco_member' and memberId is not provided,
    // the backend validation for memberId (if it's strictly required for sacco_members) should catch it.
    // This simplifies client form a lot.


    const result = await register(registrationData); // Pass data without role
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
        {/* Role selection removed. Default role will be assigned by the backend. */}
        {/* The Member ID field is kept as the default role is 'sacco_member'.
            If the default role changes or doesn't need memberId, this can be removed or conditionally rendered.
            For now, we assume users registering are primarily sacco_members or the backend handles non-memberId cases.
         */}
        <div>
          <label htmlFor="memberId">Member ID (if applicable):</label>
          <input
            type="text"
            id="memberId"
            name="memberId"
            value={memberId}
            onChange={handleChange}
          />
        </div>
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
        <button type="submit" className="btn btn-success" disabled={loading}>
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
