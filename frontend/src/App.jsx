import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import LoginForm from './Pages/Login';
import ErrorPage from './errors/wrongRoute.js';
import Chat from './Pages/Chat/Chat.jsx';
import store from './slices/index.js';
import SignUp from './Pages/SignUp';
import AuthProvider from './Components/AuthProvider/AuthProvider';
import ChatRoute from './Components/ChatRoute/ChatRoute';
import paths from './paths';

const App = () => {
  const socket = io();

  const rollbarConfig = {
    environment: 'testenv',
    accessToken: process.env.ROLLBAR_TOKEN,
  };

  const route = createBrowserRouter([
    {
      path: paths.defaultPath,
      element: (
        <ChatRoute>
          <Provider store={store}>
            <Chat socket={socket} />
          </Provider>
        </ChatRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: paths.logInPath,
      element: <LoginForm />,
    },
    {
      path: paths.signUpPath,
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
