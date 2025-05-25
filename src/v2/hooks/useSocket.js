import React, { useEffect, useState } from 'react'

const useSocket = () => {
    const [socket, setSocket] = useState(null);
    const WS_URL = "wss://tictactoe-live-server.onrender.com"
    // const WS_URL = "ws://localhost:8080"
    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => setSocket(ws);
        ws.onclose = () => setSocket(null);
        return () => { ws.close() };
    }, [])

    return socket;
}

export default useSocket;