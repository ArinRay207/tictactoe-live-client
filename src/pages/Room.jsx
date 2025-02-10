import React, { useEffect, useState } from 'react'
import { socket } from '../socket'
import { useParams } from 'react-router-dom';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Room = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState();

    useEffect(() => {
		console.log(socket)
		socket.emit("join", roomId, localStorage.getItem("username"));
		socket.on("updateRoom", (room) => {
			setRoom(room);
		})
		socket.on("error", (errorCode, errorMessage) => {
			alert(`Error: ${errorCode}: ${errorMessage}`)
		})
    }, [])

    useEffect(() => {console.log(room)}, [room])

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
					room?.firstTurn === 0 ? <CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} /> : <CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
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
								onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(i, j)}}
							>
								<CircleOutlinedIcon className={`naught ${cell % 10 === 0 ? 'visible' : 'invisible'}`} style={{fontSize: '7rem'}} />
								<CloseRoundedIcon className={`cross ${cell % 10 === 1 ? 'visible' : 'invisible'}`} style={{fontSize: '7rem'}} />
							</div>
						))
					))
				}
				{/* 
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[0][1] >= 100 ? 'win' : room?.board[0][1] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(0, 1)}}>
					{
					room?.board[0][1] === -1 ? '' : (
						(room?.board[0][1] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[0][1] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div>
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[0][2] >= 100 ? 'win' : room?.board[0][2] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(0, 2)}}>
					{
					room?.board[0][2] === -1 ? '' : (
						(room?.board[0][2] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[0][2] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div>
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[1][0] >= 100 ? 'win' : room?.board[1][0] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(1, 0)}}>
					{
					room?.board[1][0] === -1 ? '' : (
						(room?.board[1][0] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[1][0] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div>
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[1][1] >= 100 ? 'win' : room?.board[1][1] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(1, 1)}}>
					{
					room?.board[1][1] === -1 ? '' : (
						(room?.board[1][1] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[1][1] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div>
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[1][2] >= 100 ? 'win' : room?.board[1][2] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(1, 2)}}>
					{
					room?.board[1][2] === -1 ? '' : (
						(room?.board[1][2] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[1][2] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div>
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[2][0] >= 100 ? 'win' : room?.board[2][0] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(2, 0)}}>
					{
					room?.board[2][0] === -1 ? '' : (
						(room?.board[2][0] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[2][0] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div>
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[2][1] >= 100 ? 'win' : room?.board[2][1] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(2, 1)}}>
					{
					room?.board[2][1] === -1 ? '' : (
						(room?.board[2][1] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[2][1] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div>
				<div className={`tile ${room?.firstTurn === -1 ? 'disabled' : room?.board[2][2] >= 100 ? 'win' : room?.board[2][2] >= 10 ? 'draw' : ''}`} onClick={()=>{if (room?.firstTurn !== -1) handleBoardStateUpdate(2, 2)}}>
					{
					room?.board[2][2] === -1 ? '' : (
						(room?.board[2][2] % 10) === 0 ? (
						<CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} />
						) : (room?.board[2][2] % 10) === 1 ? (
						<CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
						) : " "
					)
					}
				</div> */}
			</div>
			<div className='user-name'>
				{
					room?.firstTurn === 1 ? <CircleOutlinedIcon className='naught' style={{fontSize: '7rem'}} /> : <CloseRoundedIcon className='cross' style={{fontSize: '7rem'}} />
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