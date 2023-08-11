import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import LoginForm from './routes/login';
import ErrorPage from './errors/wrongRoute.js';
import AuthContext from './contexts/index.js';
import Chat from './routes/Chat/Chat.jsx';
import useAuth from './Hooks/index.js';
import store from './slices/index.js';
import SignUp from './routes/SignUp';

const AuthProvider = ({ children }) => {
  const [logStatus, setStatus] = useState(!!localStorage.getItem('Token'));

  const logIn = () => {
    setStatus(true);
  };

  const logOut = () => {
    localStorage.removeItem('Token');
    setStatus(false);
  };

  return (
    <AuthContext.Provider value={{ logStatus, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const { logStatus } = useAuth();

  return (
    logStatus ? children : <Navigate to="/login" />
  );
};

const rollbarConfig = {
  accessToken: '8266f58662e741418e2bd7bea392e987',
  environment: 'testenv',
};

const App = () => {
  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <ChatRoute>
                <Provider store={store}>
                    <Chat />
                </Provider>
              </ChatRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <LoginForm />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);

  return (
    <AuthProvider>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <RouterProvider router={route} />
        </ErrorBoundary>
      </RollbarProvider>
    </AuthProvider>
  );
};

export default App;
