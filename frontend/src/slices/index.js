import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import socketReducer from './socketSlice.js';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
    socket: socketReducer,
  },
});
