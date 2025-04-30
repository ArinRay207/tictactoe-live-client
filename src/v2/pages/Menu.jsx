import React, { useState } from 'react'
import styles from './Menu.module.css'
import Input from '../components/Input';
import useSocket from './../hooks/useSocket';
import { eventTypes } from '../constants/eventTypes';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");

    const socket = useSocket();

    const navigate = useNavigate();

    if (!socket) {
        return <div>Loading...</div>
    }

    const handleCreate = () => {
        if (!username) {
            return;
        }
        socket.send(JSON.stringify({ type: eventTypes.CREATE, payload: { username } }));

        socket.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);
            if (type == eventTypes.CREATE) {
                navigate(`/room/${payload.roomId}?username=${username}`)
            }
        }
    }

    const handleJoin = () => {
        if (!username || !roomId) {
            return;
        }
        navigate(`/room/${roomId}?username=${username}`)
    }

    return (
        <div onClick={() => setSelectedOption(null)} className={`page ${styles['menu']}`}>
            <div
                className={`
                        btn
                        ${styles['btn']}
                        ${selectedOption === 0 && styles['active']}
                        ${selectedOption === 1 && styles['inactive']}
                    `}
                onClick={(e) => { e.stopPropagation(); setSelectedOption(0); }}
            >
                <div className={`${styles['form-title']}`}>
                    CREATE ROOM
                </div>
                <div className={`${styles['form']}`}>
                    <Input label='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <button className='btn' onClick={handleCreate}> CREATE </button>
                </div>
            </div>
            -----OR-----
            <div
                className={`
                        btn
                        ${styles['btn']}
                        ${selectedOption === 1 && styles['active']}
                        ${selectedOption === 0 && styles['inactive']}
                    `}
                onClick={(e) => { e.stopPropagation(); setSelectedOption(1); }}
            >
                <div className={`${styles['form-title']}`}>
                    JOIN ROOM
                </div>
                <div className={`${styles['form']}`}>
                    <Input label='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <Input label='Room ID' value={roomId} onChange={(e) => { setRoomId(e.target.value) }} />
                    <button className='btn' onClick={handleJoin}> JOIN </button>
                </div>
            </div>
        </div >
    )
}

export default Menu