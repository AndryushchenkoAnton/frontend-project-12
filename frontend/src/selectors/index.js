import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

// eslint-disable-next-line react-hooks/rules-of-hooks
const getChannelById = (id) => useSelector((state) => channelsSelectors.selectById(state, id));
// eslint-disable-next-line react-hooks/rules-of-hooks
const getMessages = () => Object.values(useSelector(messagesSelectors.selectEntities));
// eslint-disable-next-line react-hooks/rules-of-hooks
const getChannels = () => Object.values(useSelector(channelsSelectors.selectEntities));
// eslint-disable-next-line react-hooks/rules-of-hooks
const getCurrentChannel = () => useSelector((state) => state.channels.currentChannel);
// eslint-disable-next-line react-hooks/rules-of-hooks
const getModalChId = () => useSelector((state) => state.channels.actionChannelId);
// eslint-disable-next-line react-hooks/rules-of-hooks
const getActiveModal = () => useSelector((state) => state.modal.activeModal);

export {
  getChannels, getChannelById, getMessages, getCurrentChannel, getModalChId, getActiveModal,
};
