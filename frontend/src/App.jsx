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
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';
import useAuth from './hooks';
// import { getCurrentChannel } from "./selectors";

const App = () => {
  const socket = io();
  const state = store.getState();
  console.log(state); const {
    getUsername,
  } = useAuth();

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
    if (payload.userName === getUsername()) {
      // setNewChannelId(payload.id);
      store.dispatch(channelsActions.changeCurrentChannel(payload.id));
    }
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
    if (id !== state.currentChannel) {
      // setNewChannelId(currentChannelId);
      store.dispatch(channelsActions.changeCurrentChannel(state.currentChannel));
      return;
    }
    store.dispatch(channelsActions.changeCurrentChannel(id));
    // setNewChannelId(1);
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel({ id: payload.id, changes: payload }));
  });

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
