import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { authService } from '../backend/authentications';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const {isLogin,formData} = useContext(AppContext)
  if (!isLogin || !isAuthenticated) {
    console.log(formData);
    
    return <Navigate to="/register" />;
  }

  return children;
};

export default ProtectedRoute;
