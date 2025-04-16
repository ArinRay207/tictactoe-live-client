import { io } from 'socket.io-client';
const URL = 'wss://https://tictactoe-live-server-e1b16r1ci-arinray207s-projects.vercel.app/';

export const socket = io(URL);