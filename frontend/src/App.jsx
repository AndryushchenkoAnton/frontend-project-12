import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import LoginForm from './RouteComponents/Login';
import ErrorPage from './Errors/wrongRoute.js';
import Chat from './RouteComponents/Chat/Chat.jsx';
import store from './Slices/index.js';
import SignUp from './RouteComponents/SignUp';
import AuthProvider from './Components/AuthProvider/AuthProvider';
import ChatRoute from './Components/ChatRoute/ChatRoute';

const App = () => {
  const rollbarConfig = {
    environment: 'testenv',
    accessToken: process.env.ACCES_TOKEN,
  };

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
      path: '/Login',
      element: <LoginForm />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);
  function TestError() {
    console.log(rollbarConfig);
    const a = null;
    return a.hello();
  }
  return (
    <AuthProvider>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <TestError />
          <RouterProvider router={route} />
        </ErrorBoundary>
      </RollbarProvider>
    </AuthProvider>
  );
};

export default App;
