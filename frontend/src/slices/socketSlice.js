import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';


const socketSlice = createSlice({
    name: 'socketSlice',
    initialState: {socket: io('http://localhost:5001'),},
    reducers: {

    },
});

export default socketSlice.reducer;

