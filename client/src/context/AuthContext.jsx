import React, { createContext, useReducer, useEffect } from 'react';
import authService from '../services/authService.js'; // Import the service

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null, // Store user object { _id, name, email, role, memberId, token }
  token: localStorage.getItem('psv_token'), // Get token from local storage
  loading: true, // To check if auth state has been loaded (e.g. from localStorage)
  error: null,
};

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'; // May not directly set user, redirects to login
const AUTH_ERROR = 'AUTH_ERROR';
const USER_LOADED = 'USER_LOADED'; // When user is loaded from token
const LOGOUT = 'LOGOUT';
const CLEAR_ERRORS = 'CLEAR_ERRORS';
const SET_LOADING = 'SET_LOADING';

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // User object without token, token is separate
        loading: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('psv_token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // User object, includes token here for simplicity or store separately
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case REGISTER_SUCCESS: // After registration, typically user logs in separately
      return {
        ...state,
        loading: false,
        error: null, // Clear any previous errors
        // isAuthenticated remains false, user is null until login
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('psv_token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload, // Error message for AUTH_ERROR
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

// Create Context
export const AuthContext = createContext(initialState);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Function to load user from token if present in localStorage (e.g., on app load/refresh)
  const loadUser = async () => {
    const token = localStorage.getItem('psv_token');
    if (token) {
      authService.setAuthToken(token); // Set token for authService/axios instance
      try {
        const userData = await authService.getCurrentUser();
        dispatch({ type: USER_LOADED, payload: userData });
      } catch (err) {
        // If getCurrentUser throws (e.g. 401), it means token is invalid/expired
        dispatch({ type: AUTH_ERROR, payload: 'Session expired or token invalid. Please login again.' });
        authService.logout(); // Ensure local storage and axios headers are cleared
      }
    } else {
      // No token found, dispatch AUTH_ERROR to ensure loading is false and isAuthenticated is false
      // This is important for initial load if there's no token.
      dispatch({ type: AUTH_ERROR, payload: null }); // No error message needed if no token
    }
  };

  // Attempt to load user when the app initializes
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);


  // Login user action
  const login = async (formData) => {
    dispatch({ type: SET_LOADING });
    try {
      const userData = await authService.login(formData); // userData includes the token
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData,
      });
      // authService.login already sets the token in localStorage and axios headers
      // loadUser(); // Not strictly necessary as LOGIN_SUCCESS updates user state
      return { success: true }; // Indicate success to the caller
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.message
                       ? err.response.data.message
                       : err.message;
      dispatch({
        type: AUTH_ERROR,
        payload: errorMsg,
      });
      return { success: false, error: errorMsg }; // Indicate failure
    }
  };

  // Register user action
  const register = async (formData) => {
    dispatch({ type: SET_LOADING });
    const result = await authService.register(formData); // authService.register returns { success, data/error }
    if (result.success) {
      dispatch({ type: REGISTER_SUCCESS });
      return { success: true };
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: result.error,
      });
      return { success: false, error: result.error };
    }
  };

  // Logout user action
  const logout = () => {
    authService.logout(); // Clears token from localStorage and axios headers
    dispatch({ type: LOGOUT });
  };

  // Clear errors action
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        loadUser, // Expose if needed by other parts of app, e.g. after token refresh
        login,
        register,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
