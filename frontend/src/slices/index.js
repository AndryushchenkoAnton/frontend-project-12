import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
    modal: modalReducer,
  },
});
