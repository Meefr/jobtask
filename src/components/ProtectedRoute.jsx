import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const ProtectedRoute = ({ children }) => {
  const {token} = useContext(AppContext)
  if (!token) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;
