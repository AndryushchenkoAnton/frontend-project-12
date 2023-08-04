import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import  { actions as channelActions } from './channelsSlice.js'

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();
const { removeChannel } = channelActions;

const messagesSlice = createSlice({
  name: 'messagesSlice',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restMessages = Object.values(state.entities)
          .filter((message) => message.channelId !== payload)
      messagesAdapter.setAll(state, restMessages)
    });
  },
});

export default messagesSlice.reducer;
export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
