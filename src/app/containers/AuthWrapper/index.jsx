import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const isAuth = localStorage.getItem('token');
  if (isAuth) {
    return children;
  }

  return <Redirect to="/login" />;
};

export default AuthWrapper;
