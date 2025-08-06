// In your ProtectedRoute.jsx file

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Directly check for the 'authToken' in session storage.
  const token = sessionStorage.getItem('authToken');

  // If the token does NOT exist, redirect to the login page.
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If the token exists, render the child component.
  return children;
};

export default ProtectedRoute;