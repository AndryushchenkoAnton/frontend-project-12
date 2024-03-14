import { useContext } from 'react';
import AuthContext from '../contexts/authContext.js';
import SocketContext from '../contexts/socketContext.js';

const useAuth = () => useContext(AuthContext);
const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
