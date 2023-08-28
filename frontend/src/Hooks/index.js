import { useContext } from 'react';
import AuthContext from '../Contexts/index.js';

const useAuth = () => useContext(AuthContext);

export default useAuth;
