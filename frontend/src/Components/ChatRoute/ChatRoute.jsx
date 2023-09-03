import { Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from '../../hooks';

const ChatRoute = ({ children }) => {
  const { logStatus } = useAuth();

  return (
    logStatus ? children : <Navigate to="/login" />
  );
};

export default ChatRoute;
