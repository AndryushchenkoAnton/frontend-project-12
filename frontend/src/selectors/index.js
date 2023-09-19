import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

const getChannelById = (id) => (state) => channelsSelectors.selectById(state, id);
const getMessages = () => messagesSelectors.selectEntities;
const getChannels = () => channelsSelectors.selectEntities;
const getCurrentChannel = (state) => state.channels.currentChannel;
const getModalChId = (state) => state.channels.actionChannelId;
const getActiveModal = (state) => state.modal.activeModal;

export {
  getChannels, getChannelById, getMessages, getCurrentChannel, getModalChId, getActiveModal,
};
