import React, { useState } from 'react';
import AuthContext from '../../contexts/index.js';

const AuthProvider = ({ children }) => {
  const [logStatus, setLogStatus] = useState(!!localStorage.getItem('Token'));

  const logIn = () => {
    setLogStatus(true);
  };

  const logOut = () => {
    localStorage.removeItem('Token');
    setLogStatus(false);
  };

  return (
    <AuthContext.Provider value={{ logStatus, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
