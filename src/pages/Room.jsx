import React, { useEffect, useState } from 'react'
import { socket } from '../socket'
import { useParams } from 'react-router-dom';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import O from '../components/O';
import X from '../components/X';

const Room = () => {
	const { roomId } = useParams();
	const [room, setRoom] = useState();

	useEffect(() => {
		socket.emit("join", roomId, localStorage.getItem("username"));
		socket.on("updateRoom", (room) => {
			setRoom(room);
		})
		socket.on("error", (errorCode, errorMessage) => {
			alert(`Error: ${errorCode}: ${errorMessage}`)
		})
	}, [])

	const handleBoardStateUpdate = (i, j) => {
		if ((room?.turn === (room?.users.findIndex(user => (user !== null && user.id === socket.id)) ^ room?.firstTurn) && room?.board[i][j] === -1)) {
			socket.emit('move', roomId, i, j);
		}
	}

	return (
		<div className='page room'>
			<div className='room-id'>ROOM ID: {roomId}</div>
			<div className='board-container'>
				<div className='user-name'>
					{
						room?.firstTurn === 0 ? <CircleOutlinedIcon className='naught' style={{ fontSize: '7rem' }} /> : <CloseRoundedIcon className='cross' style={{ fontSize: '7rem' }} />
					}
					{room?.users.length > 0 && room?.users[0]?.username}
				</div>
				<div className='board'>
					{
						room?.board.map((row, i) => (
							room?.board[i].map((cell, j) => (
								<div
									className={`tile 
									${(room?.users[1]?.id === socket.id) ^ room?.firstTurn ? 'x-player' : 'o-player'} 
									${room?.firstTurn === -1 ? 'disabled' : cell >= 100 ? 'win' : cell >= 10 ? 'draw' : ''}
									${(room?.turn === (room?.users.findIndex(user => (user !== null && user.id === socket.id)) ^ room?.firstTurn) && room?.board[i][j] === -1) ? 'current-turn' : ''}`
									}
									onClick={() => { if (room?.firstTurn !== -1) handleBoardStateUpdate(i, j) }}
								>
									<O isVisible={cell % 10 === 0} className={`${cell % 10 === 0 ? 'visible' : 'invisible'}`} />
									<X isVisible={cell % 10 === 0} className={`${cell % 10 === 1 ? 'visible' : 'invisible'}`} />
								</div>
							))
						))
					}
					<div className="row-1"></div>
					<div className="row-2"></div>
					<div className="col-1"></div>
					<div className="col-2"></div>
				</div>
				<div className='user-name'>
					{
						room?.firstTurn === 1 ? <CircleOutlinedIcon className='naught' style={{ fontSize: '7rem' }} /> : <CloseRoundedIcon className='cross' style={{ fontSize: '7rem' }} />
					}
					{room?.users.length > 1 && room?.users[1]?.username}
				</div>
			</div>
			<button
				className={`btn ${((room?.users.length === 2) && (room?.phase !== 0)) ? '' : 'disabled'}`}
				onClick={() => {
					socket.emit("start", roomId);
				}}
			>
				{room?.phase === -1 ? "Start" : "Restart"}
			</button>
		</div>
	)
}

export default Room;