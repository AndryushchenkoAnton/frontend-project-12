import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../Slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../Slices/channelsSlice.js';

// eslint-disable-next-line react-hooks/rules-of-hooks
const getChannelById = (id) => useSelector((state) => channelsSelectors.selectById(state, id));
// eslint-disable-next-line react-hooks/rules-of-hooks
const getMessages = () => Object.values(useSelector(messagesSelectors.selectEntities));
// eslint-disable-next-line react-hooks/rules-of-hooks
const getChannels = () => Object.values(useSelector(channelsSelectors.selectEntities));

export { getChannels, getChannelById, getMessages };
