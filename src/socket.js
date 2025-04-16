import { io } from 'socket.io-client';
const URL = 'wss://tictactoe-live-server.onrender.com/';

export const socket = io(URL, {
    transports: ['websocket'],
    withCredentials: true,
});