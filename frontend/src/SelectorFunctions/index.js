import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../Slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../Slices/channelsSlice.js';

const getChannelById = (id) => useSelector((state) => channelsSelectors.selectById(state, id));

const getMessages = () => Object.values(useSelector(messagesSelectors.selectEntities));

const getChannels = () => Object.values(useSelector(channelsSelectors.selectEntities));

export { getChannels, getChannelById, getMessages };
