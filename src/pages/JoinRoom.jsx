import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const JoinRoom = () => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  return (
    <div>
      <div className='heading'>Join Room</div>
      <div className='main-container'>
        <input
          placeholder='Username' className='input'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />

        <input
          placeholder='Room Id' className='input'
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value)
          }}
        />

        <button
          className='btn'
          onClick={() => {
            localStorage.setItem("username", username);
            navigate(`/room/${roomId}`);
          }}
        >
          Join
        </button>
      </div>
    </div>

  )
}

export default JoinRoom