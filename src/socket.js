import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://tic-tac-toe-live-server-pzly445qf-arinray207s-projects.vercel.app/';

export const socket = io(URL);