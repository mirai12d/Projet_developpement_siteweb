import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return null; // ou un petit spinner si tu veux
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
