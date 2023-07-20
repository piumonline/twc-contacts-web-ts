// PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './auth'; // Create your own function to check if the user is logged in

interface PrivateRouteProps {
  element: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  if (isLoggedIn()) {
    return element
  } else {
    return <Navigate to="/login" replace />;
  }
};