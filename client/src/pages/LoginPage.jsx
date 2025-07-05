import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading, clearErrors } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors(); // Clear previous errors
    const result = await login({ email, password });
    if (result && result.success) {
      // Successful login, AuthContext state is updated.
      // PrivateRoute or a redirect in App.js based on isAuthenticated will handle navigation.
      // Or, if a specific redirect from login is desired:
      const { state } = history.location;
      const from = state && state.from && state.from.pathname;
      history.push(from || '/dashboard');
    }
    // If result.success is false, the error is already set in AuthContext and will be displayed.
  };

  // Redirect if already logged in (or let PrivateRoute handle it)
  // const { isAuthenticated } = useContext(AuthContext);
  // if (isAuthenticated && !loading) {
  //   history.push('/dashboard');
  // }


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
