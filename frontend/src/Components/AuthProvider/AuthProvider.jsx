import React, { useState } from 'react';
import AuthContext from '../../Contexts/index.js';

const AuthProvider = ({ children }) => {
  const [logStatus, setLogStatus] = useState(!!localStorage.getItem('Token'));

  const setToken = (value) => {
    localStorage.setItem('Token', value);
  };

  const getToken = () => localStorage.getItem('Token');

  const setUsername = (value) => {
    localStorage.setItem('userName', value);
  };

  const getUsername = () => localStorage.getItem('userName');

  const logIn = () => {
    setLogStatus(true);
  };

  const logOut = () => {
    localStorage.removeItem('Token');
    setLogStatus(false);
  };

  return (
    <AuthContext.Provider value={{
      logStatus, logIn, logOut, getToken, getUsername, setToken, setUsername,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
