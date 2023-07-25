import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import LoginForm from './routes/login';
import ErrorPage from './errors/wrongRoute';

const App = () => {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <div>/ route</div>,
      errorElement: <ErrorPage />,
    },
    {
      path: 'login',
      element: <LoginForm />,
    },
  ]);

  return (
    <RouterProvider router={route} />
  );
};

export default App;
