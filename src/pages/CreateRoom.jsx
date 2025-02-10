import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { socket } from '../socket';
import ShortUniqueId from 'short-unique-id';

const CreateRoom = () => {
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	return (
		<div>
			<div className='heading'>Create Room</div>
			<div className='main-container'>
				<input type='text' required placeholder='Username' className='input' value={username} onChange={(e) => {setUsername(e.target.value)}} />
				<button 
					className='btn'
					onClick={() => {
						if (username === '') {
							return;
						}
						const { randomUUID } = new ShortUniqueId({ length: 10 });
						const roomId = randomUUID();
						socket.emit("create", roomId);
						localStorage.setItem("username", username);
						navigate(`/room/${roomId}`);
					}}
				>
					Create
				</button>
			</div>
		</div>
	)
}

export default CreateRoom;