import { Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from '../../hooks';
import paths from '../../paths';

const ChatRoute = ({ children }) => {
  const { logStatus } = useAuth();

  return (
    logStatus ? children : <Navigate to={paths.logInPath} />
  );
};

export default ChatRoute;
