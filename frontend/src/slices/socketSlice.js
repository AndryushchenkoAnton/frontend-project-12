import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';


const socketSlice = createSlice({
    name: 'socketSlice',
    initialState: {socket: io(),},
    reducers: {

    },
});

export default socketSlice.reducer;

